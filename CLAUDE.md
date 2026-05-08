# Relay conventions

These are the rules to follow whenever you write or modify Relay code in this repo. The list will grow over time — add to it rather than rewriting it.

## Where the `graphql` tag lives

**Inline the `graphql\`...\`` tag inside the hook call. Do not assign it to a module-level constant.**

Yes:

```tsx
const data = useLazyLoadQuery<FooQuery>(
  graphql`
    query FooQuery {
      ...
    }
  `,
  { ... },
);
```

```tsx
const { data } = usePaginationFragment<FooPaginationQuery, Foo_bar$key>(
  graphql`
    fragment Foo_bar on Bar
    @refetchable(queryName: "FooPaginationQuery")
    @argumentDefinitions(...) {
      ...
    }
  `,
  fooRef,
);
```

No:

```tsx
// Don't hoist the tag to the module top.
const FooQuery = graphql`query FooQuery { ... }`;

function Component() {
  const data = useLazyLoadQuery<FooQuery>(FooQuery, { ... });
}
```

This applies to every Relay hook that takes a tagged operation/fragment: `useLazyLoadQuery`, `useFragment`, `usePaginationFragment`, `useRefetchableFragment`, `useMutation`, `useSubscription`, `usePreloadedQuery`, etc.

The babel-plugin-relay rewrite is identical either way; this is purely a colocation rule so the operation/fragment lives next to the hook that uses it.

## Operation and fragment naming

- Every operation/fragment name **must start with the source file's module name** — Relay's compiler enforces this.
  - For most files the module name is the basename without extension: `Foo.tsx` → `Foo`.
  - For `index.tsx` files the module name is the **parent directory** name: `routes/index.tsx` → `routes`.
  - For TanStack-Router param files like `$slug.tsx`, `$sectorSlug.tsx`, etc., the `$` is stripped and the rest is PascalCased: `$slug.tsx` → `Slug`, `$sectorSlug.tsx` → `SectorSlug`.
- Operation/fragment names are **globally unique**. Two `$slug.tsx` files cannot both define a `SlugQuery`. Disambiguate by suffix: `SlugSectorQuery`, `SlugProductTypeQuery`.
- Fragment names follow `<ModuleName>_<lowerCaseTypename>`, e.g. `ProductTypePageBody_productType` (a fragment on `ProductType` declared in `ProductTypePageBody.tsx`).
- `@refetchable(queryName: "...")` and `@connection(key: "...")` keys should also be prefixed with the module name to keep all generated artifacts under one identifiable namespace.

## After editing any `graphql` tag

Run `yarn relay` (or `yarn relay:watch` while iterating). Compiled artifacts emit into a `__generated__/` folder next to the source file. Don't hand-edit them — they're gitignored.

## Schema source of truth

`server/schema.graphql` is the single SDL source. The client's `relay.config.json` reads it via `../server/schema.graphql`. When changing the schema, edit that file — the server reads it at boot, the relay-compiler reads it on next compile. No second copy.

## `@simulateError` directive

A field tagged with `@simulateError` is replaced with `null` in the response and an error is appended to `errors`. The directive is implemented entirely in the client's network function (`client/src/RelayEnvironment.ts` + `client/src/relay/simulateErrorDirective.ts`) and is dev-only (`import.meta.env.DEV`).

```graphql
query Foo {
  sectors(first: 5) {
    edges {
      node {
        id
        name @simulateError
      }
    }
  }
}
```

For arrays the directive nulls every element's tagged field and emits one error per index, e.g. `path: ["sectors", "edges", 0, "node", "name"]`.

**Where the directive is declared:** `server/schema.graphql`. It must live in the *main* schema (not in `relay.config.json`'s `schemaExtensions`), because the relay-compiler treats schemaExtensions directives as client-only and strips them from the operation text the runtime sees — which would defeat the runtime detection. The server side accepts the directive as a no-op (it's stripped from the query before send anyway).

**Add a new dev-only directive** by following the same pattern: declare it in `server/schema.graphql`, parse/strip/post-process inside `RelayEnvironment.ts`'s `fetchFn`, gate on `import.meta.env.DEV`.

## Error boundary

`client/src/components/ErrorBoundary.tsx` is a minimal, framework-agnostic React class boundary. It accepts only `children` and `fallback` (a `ReactNode`) and renders `fallback` once any descendant throws. It has no reset behavior — recovery happens by remounting (e.g. navigating away). It's mounted in `routes/__root.tsx`, **outside** the `<Suspense>` that wraps `<Outlet />`.

**To make `@simulateError` actually reach the boundary**, just nulling a field is not enough — Relay's default behavior is to surface field errors as a partial read with a console warning, not a thrown exception. Use `@throwOnFieldError` (a built-in relay-runtime directive) on the operation or fragment that selects the simulated field:

```graphql
query Foo @throwOnFieldError {
  sectors(first: 5) {
    edges {
      node {
        id
        name @simulateError
      }
    }
  }
}
```

`@throwOnFieldError` is stripped from the network text by the relay-compiler (it's a client-runtime directive); only `@simulateError` actually goes over the wire. When the simulated error lands in the response's `errors` array, Relay throws on read at the hook, the boundary catches it, and the Try-again button clears the boundary so a fresh navigation re-fetches.
