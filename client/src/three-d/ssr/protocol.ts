import type { RecordedResponse } from "../runtime/createThreeDEnvironment.js";
import { getModuleId, getRegisteredThunk } from "../runtime/moduleRef.js";

/**
 * How the server hands Relay state to the browser. Each mode is a different
 * real-world strategy (see docs/data-driven-dependencies.md, "SSR").
 */
export const modes = {
  replay: "Replay network responses + preload 3D modules before hydrateRoot (recommended)",
  "replay-no-preload": "Replay network responses, no module preload",
  "snapshot-naive": "Store snapshot via JSON.stringify(store.getSource().toJSON())",
  "snapshot-revived": "Store snapshot with module refs encoded as ids + revived + preload",
  "server3d-snapshot": "Server 3D page, naive store snapshot (refs are strings) + preload",
  "server3d-snapshot-no-preload": "Server 3D page, naive store snapshot, no preload",
  csr: "No SSR markup: client renders from scratch",
} as const;
export type Mode = keyof typeof modes;

export const isServer3DMode = (mode: Mode) => mode.startsWith("server3d");

export type SsrPayload = {
  mode: Mode;
  slug: string;
  /** Every GraphQL response the server environment received. */
  responses?: RecordedResponse[];
  /** JSON-encoded store records (snapshot modes). */
  recordsJson?: string;
  /** Ids of every 3D module (components + normalization ASTs) the render used. */
  modules: string[];
  serverRenderMs: number;
};

/**
 * Collects the module ids the server render actually used, from the
 * `__module_component_*` / `__module_operation_*` values in the store. This
 * is per-request by construction and covers nested 3D.
 */
export function collectModuleIds(records: Record<string, Record<string, unknown> | null>) {
  const ids = new Set<string>();
  for (const record of Object.values(records)) {
    if (record == null) continue;
    for (const [key, value] of Object.entries(record)) {
      if (key.startsWith("__module_") && value != null) ids.add(getModuleId(value));
    }
  }
  return [...ids];
}

const REF = "__3dRef";

/** `JSON.stringify` that keeps compiler-3D module refs as `{ __3dRef: id }`. */
export function stringifyRecordsWithRefs(records: unknown) {
  return JSON.stringify(records, (_key, value) =>
    typeof value === "function" ? { [REF]: getModuleId(value) } : value,
  );
}

/** Inverse of `stringifyRecordsWithRefs`. The thunks must be registered first. */
export function parseRecordsWithRefs(json: string) {
  return JSON.parse(json, (_key, value) => {
    if (value != null && typeof value === "object" && REF in value) {
      return getRegisteredThunk((value as Record<string, string>)[REF]) ?? undefined;
    }
    return value;
  });
}

/** `<script>`-safe JSON. */
export function serializeForScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
