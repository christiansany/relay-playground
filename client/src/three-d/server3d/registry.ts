import { registerModule } from "../runtime/moduleRef.js";

/**
 * Server 3D: the server sends *names*, the client has to turn them into
 * code. Meta does this with Haste and `JSResource('m#Name')`. In OSS you
 * need a registry like this one, either hand-written or generated (Vite
 * `import.meta.glob`, webpack `require.context`, a codegen step).
 *
 * It covers both reference kinds the server returns:
 * - `__module_component_*`: the `@module(name:)` string, or whatever the
 *   server swapped in (see `Server3DVideoBlockB`),
 * - `__module_operation_*`: `<Fragment>$normalization.graphql`.
 *
 * Downsides compared with compiler 3D: the registry is a second source of
 * truth, and every entry is a potential "server named a module the client
 * doesn't have" failure. That's also why the server can't know the
 * client's chunk URLs unless you share a build manifest.
 */
const modules: Record<string, () => Promise<unknown>> = {
  Server3DTextBlock: () => import("./Server3DTextBlock.js"),
  Server3DVideoBlock: () => import("./Server3DVideoBlock.js"),
  Server3DVideoBlockB: () => import("./Server3DVideoBlockB.js"),
  Server3DSpecsBlock: () => import("./Server3DSpecsBlock.js"),
  "Server3DTextBlock_block$normalization.graphql": () =>
    import("./__generated__/Server3DTextBlock_block$normalization.graphql.js"),
  "Server3DVideoBlock_block$normalization.graphql": () =>
    import("./__generated__/Server3DVideoBlock_block$normalization.graphql.js"),
  "Server3DSpecsBlock_block$normalization.graphql": () =>
    import("./__generated__/Server3DSpecsBlock_block$normalization.graphql.js"),
};

for (const [id, thunk] of Object.entries(modules)) registerModule(id, thunk);
