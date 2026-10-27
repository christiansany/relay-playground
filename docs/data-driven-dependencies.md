# Data-Driven Dependencies (3D) in Relay: how it works and how to use it

> Research write-up for the `research/data-driven-dependencies` branch. Everything here was
> checked against the Relay source (facebook/relay `main` @ 2026-10-26, plus the `v21.0.1` tag)
> and against the running PoC in this repo. Statements about Next.js are **not** tested in a
> Next app and are marked as such.

## TL;DR

- **What it is.** `@module` / `@match` let a fragment spread say "if the data has _this
  concrete type_, render it with _this module_". Relay then downloads the code **only for types
  that are actually present in the response**. That covers the component and the normalization
  AST for its fragment.
- **Three flavors.**
  1. **Compiler 3D**: the compiler bakes `() => import(...)` into the artifacts. No server
     changes. **This is the one that fits our Next.js app.**
  2. **Server 3D**: the server answers `js(module:) : JSDependency` fields with module
     references. Needs schema and server support, plus a client registry.
  3. **Client 3D**: the type is decided by client data or Relay Resolvers. Niche.
- **It works today**, but OSS has sharp edges that the docs don't mention (all reproduced here):
  1. `MatchContainer` is **not exported** from `react-relay`. Deep-import
     `react-relay/lib/relay-hooks/MatchContainer`, or reimplement its ~40 lines.
  2. `MatchContainer`'s `loader` prop is **required**. The docs' examples omit it.
  3. `operationLoader` must be passed to **both** `Environment` **and** `Store`, otherwise
     `check()` and GC throw.
  4. **relay-compiler 21.0.1 emits broken import paths** for non-Haste projects (bare
     specifiers like `import('FooView_foo$normalization.graphql')`). This is fixed on Relay
     `main` (#5306, plus a default `() => import('<$module>')` provider) but **not released yet**.
     This branch uses the nightly `0.0.0-main-b9e1c520`. A verified 21.0.1 workaround is
     [below](#relay-compiler-2101-vs-main).
  5. `extend type Query` in the server schema file makes Relay treat the fields as client
     extensions: the operation text came out `null` (unrelated to 3D, but cost an hour).
- **CSR impact.** You add one round trip after the data, but it runs in parallel:
  normalization AST ∥ component chunk. Each level of **nested** 3D adds another sequential
  round trip.
- **SSR impact.** This is the big one. In compiler 3D the store holds **functions**, so
  `JSON.stringify(store)` silently drops the module references. A hydrated store then reports
  `missing` and **refetches the whole query**. Even with serializable refs (Server 3D), the
  client must **preload the normalization ASTs before hydrating**, or `check()` reports `missing`
  again. The working recipe: replay the server's GraphQL responses and preload every 3D module
  the server used before `hydrateRoot`. Result: 0 extra requests, no hydration mismatch, and
  synchronous hydration.
- **Is it worth it vs `React.lazy` + `switch(__typename)`?** For _component code_ the two are
  equivalent: same chunks, same waterfall. 3D additionally splits the _normalization AST_ per
  type, lets the server negotiate a rendering strategy (`@match` + `supported`), and (Server 3D
  only) lets the server choose or swap modules. With small fragments, the 3D query artifact is
  even **larger** (7.7 kB vs 5.3 kB minified here). It pays off with many types and/or large
  per-type fragments, or if you need `@match` negotiation.

---

## 1. Running the PoC

```sh
yarn install && yarn relay
yarn dev                                   # GraphQL :4000 + Vite :5173
open http://localhost:5173/three-d         # CSR lab (8 tabs)
yarn workspace client ssr                  # SSR harness :5174 (needs the GraphQL server)
open "http://localhost:5174/?mode=replay"  # try every mode in the top nav
yarn workspace client test                 # runtime tests (no server needed)
```

Ports are overridable: `PORT=4100 yarn workspace server dev`,
`VITE_GRAPHQL_ENDPOINT=http://localhost:4100/graphql`, `SSR_PORT=5184`.

| Path                                                | What                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| `client/relay.config.js`                            | two Relay projects: `main` (compiler 3D), `server3d`                     |
| `client/src/three-d/runtime/`                       | everything an app needs: module cache, `operationLoader`, `Match3D`, env |
| `client/src/three-d/blocks`, `prices`, `formatters` | the 3D-loaded modules                                                    |
| `client/src/three-d/demos/`                         | CSR demos (one per usage option)                                         |
| `client/src/three-d/server3d/`                      | Server 3D + Client 3D (resolvers) demos, module registry                 |
| `client/src/three-d/ssr/` + `client/ssr/server.mjs` | framework-agnostic streaming SSR + hydration harness                     |
| `client/src/three-d/__tests__/runtime.test.ts`      | pins down store/check/GC/serialization behavior                          |
| `server/src/threeD.ts`                              | resolvers, `js()` field, `extensions.jsModules`                          |

---

## 2. How it works, end to end

Running example (`demos/UnionBlocksDemo.tsx`):

```graphql
query UnionBlocksDemoQuery($slug: String!) {
  productPage(slug: $slug) {
    blocks {
      # [ProductPageBlock!]!  (union)
      __typename
      ...TextBlock_block @module(name: "../blocks/TextBlock")
      ...VideoBlock_block @module(name: "../blocks/VideoBlock")
      # …one per concrete type
    }
  }
}
```

### 2.1 Compile time (`relay-transforms/src/match_/match_transform.rs`)

For every spread with `@module` the compiler:

1. **Validates** it (see [§3 rules](#3-rules-and-compiler-errors)).
2. Rewrites `...TextBlock_block @module(...)` into an inline fragment
   `... on TextBlock { ...TextBlock_block }` and attaches `ModuleMetadata`:
   - `key` (`documentName` at runtime): the `@match(key:)` value, or the _document name_
     by default. It decides the store keys `__module_component_<key>` /
     `__module_operation_<key>`.
   - `module_id`: `"<Document>.<path>"`, e.g. `UnionBlocksDemoQuery.productPage.blocks`.
   - `fragment_prop_name`: the part after the first `_` (`TextBlock_block` → `block`).
3. **Split normalization.** It generates a separate `TextBlock_block$normalization.graphql`
   artifact (a `SplitOperation`). The query's normalization AST does **not** contain the block's
   fields, only a `ModuleImport` node.
4. Decides where module references come from:
   - **Compiler 3D** (`moduleImportConfig.dynamicModuleProvider` set): the `ModuleImport`
     node in the normalization AST gets
     `componentModuleProvider: <statement with path to TextBlock>` and
     `operationModuleProvider: <statement with path to the $normalization artifact>`.
     Nothing changes in the query text.
   - **Server 3D** (no provider, or `surface: "resolvers"` for non-resolver types): it adds
     two selections the _server_ must answer:
     ```graphql
     ... on TextBlock {
       ...TextBlock_block
       __module_operation_Q: js(module: "TextBlock_block$normalization.graphql", id: "Q.productPage.blocks")
       __module_component_Q: js(module: "TextBlock", id: "Q.productPage.blocks")
     }
     ```
     This requires `scalar JSDependency` and `js(module: String!, id: String): JSDependency` on
     every concrete type (server-side, not a client extension). See `server/schema.graphql`.
   - **Client 3D** (`surface: "resolvers"` and a `@relayType` model type): the provider goes
     into the **reader** AST as well, so the reader can resolve the component without anything
     in the store.
5. `@match` on a field with a `supported: [String]` argument: the compiler **fills it in**
   with the concrete type names of the `@module` spreads (`supported: ["RegularPrice",
"SalePrice", "BundlePrice"]`). You may not pass it yourself. Look at the query text in the
   lab's inspector.
6. Emits a `// @dataDrivenDependency <module_id> {"branches":{…}}` docblock (and
   `@indirectDataDrivenDependency` for nested ones) at the top of the query artifact. It lists
   **every possible** component and normalization module per type. Meta's tooling uses it to
   build JS-dependency manifests. We could parse it at build time for route-level preloading
   too (not done in this PoC).

### 2.2 Network → store (`RelayResponseNormalizer._normalizeModuleImport`)

The server returns a normal payload. Fields of _all_ matched types are included, because the
spreads are inline and the server simply resolves them. When the normalizer reaches a
`ModuleImport` node for a record whose type matches:

```js
componentReference = moduleImport.componentModuleProvider || data[componentKey]; // compiler || server 3D
operationReference = moduleImport.operationModuleProvider || data[operationKey];
record[`__module_component_${key}`] = componentReference;   // ← a FUNCTION in compiler 3D
record[`__module_operation_${key}`] = operationReference;
followupPayloads.push({ kind: "ModuleImportPayload", operationReference, data, dataID, … });
```

So **only the envelope is written** (`__typename`, `id`, the two references). The block's own
fields (`heading`, `body`, …) are **not normalized yet** (proven in `runtime.test.ts`).

### 2.3 Follow-ups (`OperationExecutor._processFollowupPayload`)

For each `ModuleImportPayload`:

- `operationLoader.get(ref)` returns the AST → normalized **synchronously**, in the same
  publish.
- `null` → `operationLoader.load(ref)` (async). `_pendingModulePayloadsCount++`, the
  operation **stays in flight** (Suspense keeps waiting), and when the AST arrives, the subtree
  is normalized and published (`execute.async.module` log event). If that subtree contains 3D
  again, this repeats: **nested 3D = sequential round trips**.

### 2.4 Reading (`RelayReader._readModuleImport`) and rendering (`MatchContainer`)

The reader looks up `__module_component_<key>` on the record (falling back to the reader-AST
provider for Client 3D) and returns, next to the selected fields:

```js
{ __typename, __id, __fragments: { TextBlock_block: {} }, __fragmentOwner,
  __fragmentPropName: "block", __module_component: <reference> }
```

If the type matched no `@module` spread, these keys are absent. `MatchContainer`:

1. calls `loader(__module_component)` **during render**. Throwing a promise suspends.
2. renders `<Loaded {...props} block={{ __id, __fragments, __fragmentOwner }} />`.
3. renders `fallback` (or `null`) if nothing matched (forward compatibility with new union
   members, see `ComparisonBlock`).

The loaded component reads its data with plain `useFragment`. If its subtree hasn't been
normalized yet (§2.3), it **suspends on the in-flight operation**.

### 2.5 Where else the `operationLoader` is used

| Caller                                                                                      | Method     | If `get()` returns null                           |
| ------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------- |
| OperationExecutor (network, `commitPayload`)                                                | get → load | subtree normalized later, request stays active    |
| **DataChecker** (`environment.check`, `store-or-network`, `usePreloadedQuery` availability) | get        | **`missing` → refetch / suspend**                 |
| **RelayReferenceMarker** (GC)                                                               | get        | subtree not marked → **can be garbage-collected** |
| optimistic responses (mutations)                                                            | get → load | optimistic subtree applied async                  |

So `get()` **must** answer synchronously for anything already loaded. The PoC's cache
(`runtime/moduleRef.ts`) does exactly that. The GC case is proven in `runtime.test.ts`:
with an async-only loader, the carousel's nested blocks are collected while the query is
still retained.

---

## 3. Rules and compiler errors

| Rule                                                                                                         | Notes                                                                   |
| ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `@module(name:)` must be a string literal                                                                    |                                                                         |
| Fragment must be named `Something_propName`                                                                  | prop name = suffix; the loaded component **must** accept that prop name |
| `@module` only on spreads of fragments on **object** types                                                   | not on interfaces/unions                                                |
| One `@module` per concrete type per path (same fragment + same name if repeated)                             | "InvalidModuleSelectionMultipleMatches"                                 |
| More than one field with 3D in a document needs `@match(key: "<DocumentName>…")`                             | the key must start with the document name                               |
| `@match` without `key` only on fields with a `supported: [String]` arg returning an abstract type            | otherwise "InvalidMatchWithNoSupportedArgument"                         |
| Inside `@match`: only `@module` spreads and `__typename`                                                     | no aliases, no plain fields                                             |
| No other directives on a `@module` spread except `@defer` and `@alias`                                       |                                                                         |
| No `@inline` fragments with `@module`                                                                        |                                                                         |
| `@arguments` on a `@module` spread only with the `no_inline` feature flag (`@no_inline`)                     |                                                                         |
| Spreads with `@module` do **not** need `@alias` in abstract position                                         | plain spreads do in Relay 21 (see the baseline demo)                    |
| Server 3D: `scalar JSDependency` + `js(module: String!, id: String[, branch: String])` on each concrete type | must be in the server schema, not an extension                          |
| Client 3D: **all** implementors of the parent interface/union must be `@relayType` models                    |                                                                         |
| Don't select `js` yourself                                                                                   | "InvalidDirectUseOfJSField"                                             |

---

## 4. Configuration

### 4.1 Compiler (`client/relay.config.js`)

```js
moduleImportConfig: {
  // statement pasted into the artifacts; every <$module> is replaced
  dynamicModuleProvider: { mode: "Custom", statement: "() => import('<$module>')" },
  // optional: a different statement for the $normalization artifacts
  operationModuleProvider: { mode: "Custom", statement: "..." },
  // optional: "resolvers" = provider only for Relay-Resolver types (rest = Server 3D); "all"
  surface: "resolvers",
}
```

The PoC uses
`Object.assign(() => import('<$module>'), { modulePath: '<$module>', importer: import.meta.url })`.
That's still a plain lazy import, but it also carries enough information to derive a **stable,
serializable id** (`/src/three-d/blocks/TextBlock`), which SSR needs. Don't write
`new URL('<$module>', import.meta.url)` literally: Vite treats it as an asset reference and
emitted the `.ts` artifact as a static file.

#### relay-compiler 21.0.1 vs main

|                                  | 21.0.1 (current release)                            | main / nightly `0.0.0-main-b9e1c520`                                                                         |
| -------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `<$module>` for components       | `@module(name:)` **verbatim** (`import('FooView')`) | relative names resolved from the source file to the artifact (`import('../../blocks/TextBlock')`, #5306)     |
| `<$module>` for split operations | bare `FooView_foo$normalization.graphql`            | correct relative path to the artifact's actual directory                                                     |
| no `moduleImportConfig`          | Server 3D (`js` fields)                             | defaults to `() => import('<$module>')` for non-Haste projects; use `surface: "resolvers"` to keep Server 3D |

**21.0.1 workaround** (codegen verified in a scratch project, bundling not tested): use a single
`artifactDirectory` so every `$normalization` artifact sits next to every query, give the split
operations their own statement, and make component names alias-absolute:

```json
"artifactDirectory": "src/__generated__",
"moduleImportConfig": {
  "dynamicModuleProvider":   { "mode": "Custom", "statement": "() => import('@/<$module>')" },
  "operationModuleProvider": { "mode": "Custom", "statement": "() => import('./<$module>')" }
}
```

→ `import('@/components/blocks/TextBlock')`, `import('./TextBlock_block$normalization.graphql')`.
`artifactDirectory` is a global change (and the SWC/Babel relay plugin must be told about it),
so upgrading to the next Relay release is the nicer path.

### 4.2 Runtime (`client/src/three-d/runtime/`)

```ts
const store = new Store(source, { operationLoader }); // ← easy to forget
const environment = new Environment({ network, store, operationLoader });
```

```ts
// MatchContainer: deep import, loader is required
import MatchContainer from "react-relay/lib/relay-hooks/MatchContainer";
<MatchContainer match={block} loader={(ref) => readModule(ref)} fallback={…} />
```

`readModule` / `operationLoader` share a cache keyed by module id: `get` is a synchronous peek,
`load` / `readModule` start the import, and `readModule` throws the pending promise (Suspense).
See `moduleRef.ts` and `operationLoader.ts`, about 150 lines total.

---

## 5. All the ways to use it (each is a lab tab)

| #   | Option                                                    | Demo                                                  | When                                                                                                                                                                                              |
| --- | --------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A   | `@module` on a **union/interface list**                   | `UnionBlocksDemo`                                     | CMS-like block lists, feed items: the canonical case                                                                                                                                              |
| B   | `@module` on a **usually-null** concrete field            | `NullableFieldDemo`                                   | energy label, rare attachments: chunk never downloaded when null                                                                                                                                  |
| C   | **`@match`** + server-chosen **strategy**                 | `MatchStrategyDemo`                                   | the server picks the best renderer _the client supports_; older clients send a shorter `supported` list and get a fallback (both shown side by side)                                              |
| D   | **Several 3D fields** in one document with `@match(key:)` | `MultipleKeysDemo` / `ProductPageView`                | full pages                                                                                                                                                                                        |
| E   | **Non-React module** via `__module_component`             | `NonReactModuleDemo`                                  | heavy formatter/validator/parser needed only for some data. OSS has no `ModuleResource`, so use `readModule(data.__module_component)`                                                             |
| F   | **Nested 3D**                                             | union demo + `noise-cancelling-headphones` (carousel) | avoid where possible: +1 sequential round trip per level                                                                                                                                          |
| G   | **Server 3D**                                             | `Server3DDemo`                                        | the server owns which module renders (A/B: header `x-3d-variant: b` swaps the video player with no client change), can announce modules early (`extensions.jsModules`), and refs are serializable |
| H   | **Client 3D** (Relay Resolvers)                           | `Client3DDemo`                                        | the type comes from client state. The reader AST carries the provider                                                                                                                             |
| –   | Baseline: **`React.lazy` + `switch(__typename)`**         | `LazySwitchBaselineDemo`                              | for comparison                                                                                                                                                                                    |

### Compiler 3D vs Server 3D vs React.lazy

|                                                      | Compiler 3D               | Server 3D                               | `React.lazy` switch                |
| ---------------------------------------------------- | ------------------------- | --------------------------------------- | ---------------------------------- |
| server changes                                       | none                      | `JSDependency`, `js()` on every type    | none                               |
| component chunk per type                             | ✅                        | ✅                                      | ✅                                 |
| normalization AST per type                           | ✅ split                  | ✅ split                                | ❌ inlined into the query artifact |
| `@match` negotiation (`supported`)                   | ✅                        | ✅                                      | ❌                                 |
| server can swap/choose modules                       | ❌                        | ✅                                      | ❌                                 |
| server can announce modules before the client parses | ❌ (but SSR can, §7)      | ✅ `extensions` / headers / Early Hints | ❌                                 |
| refs serializable (SSR store snapshots)              | ❌ functions              | ✅ strings                              | n/a                                |
| client registry of module names                      | not needed                | **needed** (`server3d/registry.ts`)     | the switch _is_ the registry       |
| extra runtime pieces                                 | `operationLoader`, loader | same + registry                         | none                               |
| artifact size, this PoC (5 small types)              | 7.7 kB min / 1.18 kB gz   | similar                                 | 5.3 kB / 1.0 kB gz                 |

---

## 6. CSR impact (measured in `/three-d`, 300 ms simulated network, 400 ms per chunk)

Union demo, espresso page, cold:

```
    1ms network:start      UnionBlocksDemoQuery
  313ms network:end
  313ms relay              execute.next (normalize + publish)   ← envelope only
  313ms loader:get-miss    …/TextBlock_block$normalization      ┐ normalization ASTs
  313ms chunk:start        …/TextBlock_block$normalization      │ (from the normalizer)
  319ms chunk:start        /src/three-d/blocks/TextBlock        ┘ components (from MatchContainer at render)
  724ms chunk:end          …$normalization → execute.async.module …
  746ms relay              execute.complete                      ← request "done" only now
  750ms chunk:end          components → render
```

- **+1 round trip after the data**, but normalization and component downloads run **in
  parallel** (one is triggered by the normalizer, the other by `MatchContainer` during render).
- **Nested 3D** (headphones carousel): the carousel's items only start loading when
  `CarouselBlock$normalization` has arrived (705 ms → second round finishes at 1121 ms).
- Only the types actually present get downloaded (`paper-notebook` → TextBlock only).
- Unknown types (`ComparisonBlock`) render the fallback. Nothing breaks.
- **Warm run** (same store, `store-or-network`): `environment.check() → available`, no
  request, instant render. That only works because `operationLoader.get` is synchronous for
  loaded modules.
- Suspense granularity matters: one boundary per block lets blocks appear independently.
  React may hold back siblings revealed close together (its ~300 ms fallback throttling, visible
  as clustered `render` events).
- Compared with `React.lazy`: the same component waterfall. 3D adds the parallel
  normalization fetch and saves the normalization bytes of absent types.
- Ways to reduce the CSR waterfall: Server 3D's `extensions.jsModules` (toggle in the lab:
  downloads start right when the response arrives), or route-level preloading driven by the
  `@dataDrivenDependency` docblock / a build manifest.

---

## 7. SSR impact (measured with `client/ssr/server.mjs`, headphones page, 300 ms chunk latency, `links=0`)

### What happens on the server

The same machinery runs in Node. The normalizer hits `ModuleImport`, `operationLoader.load()`
does a Node `import()`, and `MatchContainer`'s loader suspends until the component module is
imported. With `renderToPipeableStream`, each block's `<Suspense>` boundary streams in when
its modules are ready. Rendering is correct out of the box. The problems are all on the
**handoff to the browser**.

### Hydration strategies

| mode                              | how the browser gets state                                                                                | extra HTTP       | `check()` before hydrate | last block interactive\*                                                   | notes                                                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------- | ------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **`replay`** ✅                   | recorded responses replayed through the network layer + **preload all used modules** before `hydrateRoot` | **0**            | (store empty → replay)   | **+5 ms after hydrate** (preload: 330 ms, one parallel round incl. nested) | normalization is synchronous; `execute.complete` 1 ms after replay                                            |
| `replay-no-preload`               | responses replayed, no preload                                                                            | 0                | –                        | 630 ms                                                                     | correct, but the client re-runs the whole waterfall incl. nested round; React keeps the server HTML meanwhile |
| `snapshot-naive` ❌               | `JSON.stringify(store.getSource().toJSON())`                                                              | **1 (refetch!)** | **missing**              | 653 ms                                                                     | the compiler-3D refs are functions → dropped → `DataChecker` sees `__module_operation_*` as missing           |
| `snapshot-revived` ✅             | snapshot with refs encoded as `{__3dRef: id}`, revived from the artifact's thunks, + preload              | 0                | **available**            | +4 ms after hydrate                                                        | `ssr/protocol.ts`: thunks are found by walking the query's normalization AST                                  |
| `server3d-snapshot` ✅            | naive snapshot (refs are strings) + preload                                                               | 0                | available                | +2 ms                                                                      | needs the registry                                                                                            |
| `server3d-snapshot-no-preload` ❌ | naive snapshot, no preload                                                                                | **1 (refetch!)** | **missing**              | 317 ms                                                                     | strings survive, but `operationLoader.get()` can't answer synchronously → missing                             |
| `csr`                             | nothing                                                                                                   | 1                | missing                  | 926 ms                                                                     | baseline                                                                                                      |

\* time from `hydrateRoot` to the last block commit, in the browser, Vite dev. Absolute numbers
are only indicative. The shape is what matters.

**No mode produced a hydration mismatch** (`onRecoverableError` stayed empty). Suspending during
hydration keeps the server HTML. The cost of a missing preload is **delay and refetches,
not broken markup**. Note that a refetch that returns _different_ data could still cause
visible content changes after hydration.

### The recipe

1. **Server:** record every GraphQL response (or serialize the store with refs encoded as ids),
   and collect every 3D module id the render used. Walking the store's `__module_*` values is
   per-request and includes nested 3D (`collectModuleIds`).
2. **Server:** emit `<link rel="modulepreload">` for those modules **while streaming**, so the
   browser downloads them in parallel with the HTML (`entry-server.tsx` injects them between
   React's chunks). React 19 tolerated these links inside the root container during hydration.
   `ReactDOM.preloadModule()` from inside the loader would be the "official" alternative. No
   bundler or framework knows about these chunks: Relay artifacts use raw `import()`, so they
   aren't in any SSR manifest by default. In production you also need id → chunk URL mapping
   (Vite `ssrManifest`, Next build manifest). The PoC only maps dev URLs.
3. **Browser, before `hydrateRoot`:** `registerNestedModules(queryNode)`, then
   `await preloadAll(moduleIds)` (rounds, for nested split ops), then build the environment
   (replay or revived records), then `loadQuery(…, "store-or-network")`, then `hydrateRoot`.

---

## 8. Mapping to Next.js (App Router), not tested in a Next app

- 3D components are **client components** (they use `useFragment`). The `import()` in Relay
  artifacts is handled by webpack/Turbopack like any other dynamic import: a separate chunk,
  also loadable during SSR.
- **Next won't preload these chunks for you.** `next/dynamic` has its own tracking. Raw
  `import()` inside a Relay artifact doesn't. Emit modulepreload links yourself (e.g. from
  `useServerInsertedHTML`, or `ReactDOM.preloadModule` in the loader), using a build-manifest
  lookup for the chunk URL. Without it you still get correct pages, just later interactivity.
- **Serializing Relay state:** if your setup serializes the store (`getSource().toJSON()`)
  into the page, compiler 3D will silently trigger the refetch from §7. Either replay the raw
  responses (what `replay` does) or encode refs (`stringifyRecordsWithRefs`). And always
  preload before hydrating.
- `import.meta.url` in webpack is the build-time `file://` source path in both server and
  client bundles, so the PoC's id scheme should yield matching ids. Turbopack is untested.
- The **compiler fix is the gating item**: either the next Relay release, or the 21.0.1
  `artifactDirectory` workaround (§4.1). With the SWC relay plugin, `artifactDirectory` must be
  configured there too.
- RSC: Relay `main` has early "Relay RSC" work that touches `componentModuleProvider`. Out of
  scope here.

---

## 9. Gotchas collected along the way

1. `MatchContainer` isn't exported from `react-relay` (only its types). Use the deep import.
2. `loader` is required. It runs **during render**, so throw a promise to suspend, and keep a
   sync cache.
3. `operationLoader` belongs on the **Store** too (DataChecker + GC), not only the Environment.
4. `operationLoader.get` must be synchronous for loaded modules, or `check()` says
   `missing` and GC drops 3D subtrees.
5. Compiler-3D refs are functions. `JSON.stringify` drops them without an error.
6. Generated TS types claim `__module_component: string | null`. In compiler 3D it's a
   function. Treat it as `unknown`.
7. The prop name comes from the fragment name suffix (`X_block` → `block`). Every `@module`
   component under one field should use the same suffix.
8. A query's `execute.complete` only fires after all async split operations are normalized.
   Code that waits for completion (e.g. `fetchQuery(...).toPromise()` waits for the _first_
   payload only) can observe a partially normalized store.
9. Relay 21 requires `@alias` on plain spreads in abstract position, but not on `@module`
   spreads.
10. `extend type Query { … }` inside the **server** SDL file is treated as a client extension
    by the compiler: the fields are stripped from the operation text.
11. Vite turns `new URL('literal', import.meta.url)` into an asset. Don't put that in the
    provider statement.
12. React StrictMode double-invokes effects in dev, so `render` events appear twice in the lab
    log.

## 10. Not covered (yet)

- `@defer` on a `@module` spread (allowed by the compiler), `@module` in mutations
  (optimistic follow-ups exist in the executor) and subscriptions (`subscription_transform`).
- Persisted queries: should be fine. `supported` is part of the text/hash.
- Production build of the SSR harness (manifest-based modulepreload URLs).
- A real Next.js app (webpack and Turbopack).
