// @ts-check
const path = require("node:path");

// Paths below are relative to `root` (the repo root, so the schema in
// ../server is inside it).
const schema = "server/schema.graphql";

const shared = /** @type {const} */ ({
  language: "typescript",
  schema,
  eagerEsModules: true,
  noFutureProofEnums: true,
  typescriptExcludeUndefinedFromNullableUnion: true,
});

/**
 * Data-Driven Dependencies (3D) module provider. See
 * docs/data-driven-dependencies.md ("Compiler configuration").
 *
 * The statement is pasted verbatim into the generated normalization (and,
 * for read-time resolvers, reader) ASTs. Every `<$module>` is replaced with
 * the import path from the artifact to the `@module(name:)` target, or to the
 * `$normalization.graphql` split operation.
 *
 * - `() => import('<$module>')` gives the bundler a code-split point per
 *   module. Relay's own default on main (unreleased after v21.0.1) is exactly
 *   this statement.
 * - `modulePath` + `importer` let `getModuleId()` derive a stable,
 *   serializable identity for the otherwise anonymous thunk, the same on the
 *   server and in the browser. The SSR/hydration code needs it (it can't
 *   send a function to the browser), and so does the event log. It's resolved
 *   at runtime on purpose: Vite treats a literal `new URL('…',
 *   import.meta.url)` as an asset reference and would emit the artifact as a
 *   static file. See `src/three-d/runtime/moduleRef.ts`.
 */
const moduleProvider = /** @type {const} */ ({
  mode: "Custom",
  statement:
    "Object.assign(() => import('<$module>'), { modulePath: '<$module>', importer: import.meta.url })",
});

const config = {
  root: path.resolve(__dirname, ".."),
  // More specific paths win: `client/src/three-d/server3d` belongs to
  // the `server3d` project, everything else under `client/src` to `main`.
  sources: {
    "client/src": "main",
    "client/src/three-d/server3d": "server3d",
  },
  excludes: ["**/node_modules/**", "**/__generated__/**", "**/dist/**", "**/.yarn/**"],
  projects: {
    // "Compiler 3D": the compiler bakes the module providers into the
    // artifacts. The server never sees `@module`, it only receives the
    // `... on Type { ...Fragment }` selections and the `supported` argument
    // for `@match`. This is the mode to use when you don't own a server that
    // speaks `JSDependency`.
    main: {
      ...shared,
      moduleImportConfig: {
        dynamicModuleProvider: moduleProvider,
      },
    },
    // "Server 3D": with `surface: "resolvers"` the compiler only bakes
    // providers for types backed by Relay Resolvers (client 3D). For server
    // types it falls back to asking the server via
    // `js(module:) : JSDependency`. On relay-compiler <= 21.0.1 you could
    // also omit `moduleImportConfig` entirely to get pure Server 3D. Relay
    // main now defaults non-Haste projects to `() => import()`, so
    // `surface: "resolvers"` is the forward-compatible way to keep it.
    server3d: {
      ...shared,
      moduleImportConfig: {
        dynamicModuleProvider: moduleProvider,
        surface: "resolvers",
      },
      // Client schema for the Client 3D (Relay Resolvers) demo.
      schemaExtensions: ["client/src/three-d/server3d/client3d"],
    },
  },
};

module.exports = config;
