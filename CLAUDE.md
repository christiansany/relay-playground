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
