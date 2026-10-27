/**
 * Lab knobs. Plain mutable module state: they're read at request/download
 * time, never during render.
 */
export const settings = {
  /** Artificial latency added to every 3D chunk download (browser only). */
  chunkDelayMs: 400,
  /** Artificial latency added to every GraphQL request (browser only). */
  networkDelayMs: 300,
  /**
   * Server 3D: preload the modules listed in `extensions.jsModules` as soon
   * as the response arrives, before Relay normalizes or React renders.
   */
  preloadFromExtensions: true,
  /** Server 3D: sent as `x-3d-variant`, lets the server swap modules. */
  serverVariant: "a" as "a" | "b",
};
