# Error behaviors (`onError`) and errors on `id` in Relay

Research notes for [graphql-spec#1163 "Error behaviors"](https://github.com/graphql/graphql-spec/pull/1163),
focused on what the Relay store does when the field that errors is `id`, for queries and mutations.

Every statement under "Findings" is backed by a test in
[`client/src/lab/__tests__/`](../client/src/lab/__tests__). The suite runs against both relay-runtime
21.0.1 (npm) and facebook/relay `main` at `e043fc8` (2026-10-24), and passes on both. The
[Error lab](#poc-error-lab) (`/lab`) reproduces the same scenarios in the browser.

## The proposal in one paragraph

Requests get an `onError` property:

- `PROPAGATE` is today's behavior and stays the default forever (decided at the WG on 2026-08-06).
  An error in a non-null position nulls the nearest nullable parent.
- `NULL` puts `null` exactly where the error happened, even in a non-null position. Nothing propagates.
  The client has to match `errors[].path` to tell an error-null from a real null.
- `HALT` stops at the first error and responds with `{ data: null, errors: [that one] }`.

Every execution error also carries `pathNonNull`: one boolean per `path` segment, saying whether that
position is non-null. That's enough to re-create any behavior on the client. Status: the spec PR is
open; graphql-js has an open PR against 16.x (graphql/graphql-js#4364) and nothing in 17.0.x. Relay
neither sends `onError` nor reads `pathNonNull`.

## Why `id` is the interesting field

The schema declares `id: ID!`. Under `PROPAGATE`, an error on `id` therefore never reaches Relay as
`id: null`: it wipes the object that holds it. Under `NULL` it does reach Relay as
`{ "id": null, ...the other fields }`. That's a shape Relay was never designed for, because `id` is how
it decides which record an object belongs to.

What the normalizer does with that object ([`RelayResponseNormalizer.js:789`/`836`/`900`][normalizer]):

```js
const nextID =
  getDataID(fieldValue, typeName) || // -> null
  RelayModernRecord.getLinkedRecordID(record, storageKey) || // "reuse previously generated client IDs"
  generateClientID(parentID, storageKey /*, index */); // -> "client:<parent>:<field>[:<index>]"
```

The middle fallback looks dangerous ("reuse whatever the field pointed at before"), but it isn't: each
response is normalized into a fresh, empty record source ([`normalizeResponse.js:33`][normalize]), so
"previous" only means earlier in the same payload. In practice, an object with an errored `id` lands in
a record whose id is derived from its **path**:

| where the object is                 | record id it gets                                                |
| ----------------------------------- | ---------------------------------------------------------------- |
| `productById(id: X)`                | `client:root:productById(id:"X")`                                |
| `sectors(first: 5).edges[1].node`   | `client:root:sectors(first:5):edges:1:node` (by **position**)    |
| page 2 of a `@connection`           | `client:<parent>:products(after:"…",first:3):edges:1:node`       |
| mutation payload (`commitMutation`) | `client:local:<n>:renameProduct(input:{…}):product` (per commit) |

## Findings

`P` / `N` / `H` = `PROPAGATE` / `NULL` / `HALT`. Test file names omit the `__tests__/` prefix.

### Queries: a single entity (`idErrorQueries.test.ts`)

| situation                                                    | P                                                      | N                                                                                              | H                                                               |
| ------------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| what the parent field points to                              | `null`, with the error stored on the parent field      | a new client record holding a **copy** of the entity's fields, with `id: null` + `__errors.id` | unchanged: request errors with "No data returned for operation" |
| the real entity record (fetched earlier)                     | untouched                                              | untouched (not overwritten, but no longer what this query shows)                               | untouched                                                       |
| `@throwOnFieldError` reader that selects `id`                | throws                                                 | throws                                                                                         | n/a (network error)                                             |
| `@throwOnFieldError` reader that doesn't select `id`         | throws (parent is null + error)                        | **renders the copy**, no throw                                                                 | n/a                                                             |
| plain reader                                                 | `productById: null`                                    | `id: null` although the generated TS type says `string`                                        | last good data                                                  |
| `id @required(action: THROW)` (compiler accepts it on `ID!`) | doesn't fire (parent already null)                     | throws "Missing @required value"                                                               | n/a                                                             |
| `environment.check()` afterwards                             | `available`: store-or-network serves the errored state | `available`: same                                                                              | n/a                                                             |
| entity renamed later through another query/mutation          | view shows `null` until refetched                      | view keeps the **stale copy**                                                                  | n/a                                                             |

### Queries: lists and connections (`idErrorLists.test.ts`)

- **P**: `edges[i].node` becomes `null` with the error on the edge. Other items are normalized
  normally, nothing is shared.
- **N**: the item lives at `…:edges:<i>:node`, a record id that means "whatever is at index `i`":
  - If the list reorders and another item whose `id` errors lands at the same index, that record is
    overwritten with a **different entity**. A view still holding a ref to it (a detail panel opened
    from the row) now shows the other entity. In the test: opened "Technology", now shows "Workspace".
  - Two queries with different selections over the same list produce a **mixed record**: `name` from
    one entity, `slug` from another. No server ever sent it.
- `@connection` pagination: **P** keeps an edge whose `node` is null (with the error copied). **N**
  keeps the item, pointing at a page-path client record. The connection's de-dup by node id can't
  recognize it.
- **H**: the whole list request fails.

### Pagination / refetch on an entity whose `id` errored (`idErrorHooks.test.tsx`)

- The compiler adds `id` to the **reader** selection of every `@refetchable` fragment, because it
  needs the id to build the follow-up query.
- **N** + `@throwOnFieldError` (this repo's convention), e.g. the real `ProductTypeProductsSection`:
  the fragment **throws on render** although the component never reads `id`.
- **N** without `@throwOnFieldError`: it renders, but `loadNext()` / `refetch()` send `id: null`.
  Relay only warns ("Expected result to have a string `id` in order to refetch, got `null`") and the
  server rejects the request (`Variable "$id" of non-null type "ID!" must not be null`).
- **P**: the parent is null; there is nothing to paginate.

### Mutations (`idErrorMutations.test.ts`)

In every mode the server has already applied the mutation when the error is raised. The client ends
up out of sync either way.

| mutation                        | P                                                                                                                                                                                                 | N                                                                                                                                 | H                          |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| rename (`product { id name }`)  | `onCompleted({ product: null }, errors)`; entity keeps old name                                                                                                                                   | `onCompleted({ product: { id: null, name: "Renamed" } }, errors)`; written to `client:local:<n>:…`, the entity keeps its old name | `onError`; nothing written |
| rename + optimistic response    | optimistic value shown, then **rolled back** to the old name                                                                                                                                      | same                                                                                                                              | same                       |
| `updater`                       | payload field is null                                                                                                                                                                             | sees the client record, `getValue('id') === null`, `getErrors('id')` set; `store.get(id)` finds nothing                           | not called                 |
| `@deleteRecord` / `@deleteEdge` | nothing deleted (payload null)                                                                                                                                                                    | nothing deleted (`typeof id !== 'string'` → skipped, [`MutationHandlers.js:33`][handlers])                                        | nothing deleted            |
| `@appendEdge`                   | edge **skipped** (`node` null, [`MutationHandlers.js:130`][handlers])                                                                                                                             | edge appended, node is a copy (`id: null`) that never sees later updates                                                          | nothing appended           |
| `@throwOnFieldError`            | not allowed on mutations (compiler: "Supported location(s): QUERY, FRAGMENT_DEFINITION"). `onCompleted` never throws; spread a `@throwOnFieldError` fragment in the payload to get throwing reads | same                                                                                                                              | same                       |

Each commit has its own root (`client:local:<n>`, [`commitMutation.js:108`][commit]). Payload copies
are therefore never shared between mutations: two "create" calls with the same input append two edges.

### Things that showed up on the way

- **The field path is lost under `NULL`.** Relay builds `fieldPath` from the _remaining_ error path
  where the error was stored ([`RelayReader.js:250`][reader]). Under `NULL` the error is stored on the
  leaf itself, so `fieldPath` is `""`: in the field logger, and on `main` also in the thrown message
  (`… for field '' in 'idErrorQueriesThrowingQuery'`). Under `PROPAGATE` it's `"id"`. Worth an
  upstream issue: this is the common case once `onError: NULL` is used.
- **The thrown message changed** between 21.0.1 ("Unexpected response payload - check server logs for
  details.") and `main` ("Received a field error in the server response for field '…' in '…'. Message:
  …").
- **Nested `@catch`** (`productById @catch { id @catch }`): under `NULL` the outer `@catch` reports
  `ok: false` although the inner one handled the error (facebook/relay#5339). On `main`, with
  `RelayFeatureFlags.ENABLE_CATCH_IGNORE_HANDLED_FIELD_ERRORS`, the outer one is `ok: true`. The flag
  doesn't exist in 21.0.1.
- **`@catch` results drop `message`.** You only get `path` / `extensions` / `pathNonNull`.
- **`@deleteRecord @deleteEdge` on one field**: the compiler silently emits only the _first_ handle.
  Alias the field to use both.

## Recommendations

1. **Don't switch Relay to `onError: NULL` as-is.** For non-id fields `NULL` is what Relay wants
   (`@semanticNonNull` + `@throwOnFieldError` already assume it). For `id` it produces un-normalized
   copies, positional records that can show the wrong entity, broken pagination/refetch, and
   `@throwOnFieldError` fragments that throw without selecting `id`.
2. **If you use `NULL`, re-propagate `id` errors on the client.** Mitigation A,
   [`propagateIdErrors`](../client/src/lab/idErrorGuards.ts), walks `pathNonNull` from an errored `id`
   up to the nearest nullable position and nulls it: exactly what `PROPAGATE` would have done, for `id`
   only. Every other error keeps `NULL` semantics. It's a response transform in the fetch function and
   is tested in `idErrorGuards.test.ts`. This is the "reproduce any error behavior locally" use case
   the proposal adds `pathNonNull` for.
3. Mitigation B, [`createNullIdSafeGetDataID`](../client/src/lab/idErrorGuards.ts), gives objects with
   `id === null` a fresh client id. That removes the positional sharing and mixed records, but keeps
   the un-normalized copies and the refetch/pagination breakage. Only worth it if you want to keep
   rendering the partial object.
4. Independent of `onError`: a mutation whose payload `id` errors has still happened on the server.
   Treat `errors` in `onCompleted` as "refetch the affected data", not "nothing happened". Optimistic
   updates are rolled back in every mode.
5. Relay-side asks this research supports:
   - Read `pathNonNull` and treat an errored `id` as "this object has no identity", i.e. propagate it
     in the normalizer.
   - Send `onError` once that's in place.
   - Fix the empty `fieldPath` for leaf errors.

## How the emulation works

[`server/src/errorBehavior.ts`](../server/src/errorBehavior.ts):

- `PROPAGATE` runs against the real schema.
- `NULL` runs against a copy with every non-null wrapper stripped. Its resolvers re-raise "Cannot
  return null for non-nullable field" themselves, because the spec keeps that error in all modes.
- `HALT` runs like `NULL`, then keeps only the first error with `data: null`. A real implementation
  would stop executing at that point; the observable response is the same.
- `pathNonNull` is computed from the original field types, which each resolver records as it runs.

The Apollo plugin ([`errorBehaviorPlugin.ts`](../server/src/errorBehaviorPlugin.ts)) reads `onError`
from the request body. Apollo Sandbox can't add body fields, so it also accepts an `x-graphql-on-error`
header.

`@simulateError(if:, onlyForIds:, message:)` throws in any field's resolver.

## Running it

```bash
yarn dev                                   # server :4000, client :5173 -> http://localhost:5173/lab
yarn workspace client test                 # vitest, relay-runtime from npm
yarn workspace client test:upstream:link   # copy dist/ of a built facebook/relay checkout (default: ../relay next to this repo, or pass an absolute path)
yarn workspace client test:upstream        # same suite against that build
```

To refresh the upstream build: in the relay checkout run `git pull upstream main && yarn install`
(`postinstall` runs `gulp dist`), then link again.

## PoC: Error lab

`/lab` has its own Relay environment, an `onError` switch, a mitigation picker, and four scenarios:
single entity, list reorder, pagination, and mutations. A live store inspector flags entity records
stored under client ids, `id` field errors, and records whose `id` doesn't match their record id. The
network tab shows each request's `onError`, the raw response, and what Relay received after a guard
rewrote it.

[normalizer]: https://github.com/facebook/relay/blob/e043fc86149f/packages/relay-runtime/store/RelayResponseNormalizer.js#L776-L912
[normalize]: https://github.com/facebook/relay/blob/e043fc86149f/packages/relay-runtime/store/normalizeResponse.js#L33
[handlers]: https://github.com/facebook/relay/blob/e043fc86149f/packages/relay-runtime/handlers/connection/MutationHandlers.js
[commit]: https://github.com/facebook/relay/blob/e043fc86149f/packages/relay-runtime/mutations/commitMutation.js#L104-L109
[reader]: https://github.com/facebook/relay/blob/e043fc86149f/packages/relay-runtime/store/RelayReader.js#L246-L256
