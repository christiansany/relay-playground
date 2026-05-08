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

## Formatting

Run `yarn fmt` after every set of edits — before declaring a task done, before committing, before reporting back. The repo uses `oxfmt`; running it once at the end keeps the diff free of style noise so subsequent reviews focus on real changes.

## Schema source of truth

`server/schema.graphql` is the single SDL source. The client's `relay.config.json` reads it via `../server/schema.graphql`. When changing the schema, edit that file — the server reads it at boot, the relay-compiler reads it on next compile. No second copy.

## `@simulateError` directive

Declared in `server/schema.graphql` as `directive @simulateError on FIELD_DEFINITION`. A schema field tagged with `@simulateError` resolves by always throwing a `GraphQLError("Simulated error via @simulateError directive")`. The error lands in `errors[]` at the field's path; the field nulls in place (bubbling up only as far as the next non-`@semanticNonNull` boundary).

Implemented via a `mapSchema` transformer in `server/src/directives/simulateError.ts`, applied to the executable schema in `server/src/schema.ts`.

```graphql
type Sector implements Node {
  id: ID!
  name: String @semanticNonNull @simulateError  # always errors when read
  ...
}
```

Pair with `@semanticNonNull` (which is already on every nullable-but-required field in this repo) so the error stops at the field instead of nulling the whole parent.

## `@semanticNonNull` directive

Declared in `server/schema.graphql` per [Apollo's nullability spec v0.4](https://specs.apollo.dev/nullability/v0.4/):

```graphql
directive @semanticNonNull(levels: [Int!]! = [0]) on FIELD_DEFINITION
```

Annotates a field whose position is "semantically non-null": the value is only null when a matching entry exists in the `errors` array, and errors are not bubbled up to the nearest nullable parent — they stay at the field. `levels` is zero-indexed: level 0 is the outermost type, level 1 is the inner element of a list. For a `[T!]!` field use `levels: [0, 1]` to cover both. Pure SDL annotation: no server-side runtime behavior; relay-compiler reads it from the schema.

**Convention in this repo:** every non-null field gets `@semanticNonNull` _except `id` fields_ (Node spec requires `id: ID!` to be truly non-null with no error tolerance). When you add a new non-null field, annotate it.

**Honoring it on the client:** every query and fragment in this repo carries `@throwOnFieldError`. Without it, Relay would null `@semanticNonNull` fields and only log — components would dereference null and crash with confusing stack traces. With it, Relay throws a `RelayFieldError` at the read site whenever any selected field has a matching error, which the root `<ErrorBoundary>` catches. **Add `@throwOnFieldError` to every new query and fragment** — this is non-negotiable as long as we're using `@semanticNonNull`.

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

`@throwOnFieldError` is stripped from the network text by the relay-compiler (it's a client-runtime directive); only `@simulateError` actually goes over the wire. When the error (whether server-thrown via `@simulateError on FIELD_DEFINITION` or client-injected via `@simulateError on FIELD`) lands in the response's `errors` array, Relay throws on read at the hook, the boundary catches it, and remounting (e.g. navigating to another route and back) re-fetches.
