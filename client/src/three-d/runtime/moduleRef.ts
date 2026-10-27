import { emit } from "./events.js";
import { settings } from "./settings.js";

/**
 * What Relay hands you for a `@module` selection. The same value shows up in
 * three places:
 *
 * - in the store, under `__module_component_<key>` and
 *   `__module_operation_<key>` on the record of the matched object,
 * - as `match.__module_component`, the value `MatchContainer` passes to
 *   `loader`,
 * - as the `operationReference` given to `operationLoader.get/load`.
 *
 * Its shape depends on the mode:
 *
 * - Compiler 3D (`moduleImportConfig.dynamicModuleProvider`): whatever the
 *   configured statement evaluates to. Here it's
 *   `Object.assign(() => import(path), { moduleId })`, i.e. a thunk.
 * - Server 3D: whatever the server returned for `js(module: "...")`. Here
 *   it's a plain string like `"Server3DTextBlock"`.
 *
 * Relay itself never looks inside the reference. It only stores it and passes
 * it to your loaders. Everything below is "your" code.
 */
export type ModuleThunk = (() => Promise<unknown>) & {
  /** `<$module>` as the compiler printed it, relative to the artifact. */
  modulePath?: string;
  /** `import.meta.url` of the artifact. */
  importer?: string;
};
export type ModuleRef = ModuleThunk | string;

type Entry =
  | { status: "pending"; promise: Promise<unknown> }
  | { status: "fulfilled"; value: unknown; promise: Promise<unknown> }
  | { status: "rejected"; error: unknown; promise: Promise<unknown> };

const thunksById = new Map<string, () => Promise<unknown>>();
const cache = new Map<string, Entry>();

/**
 * Stable id for a reference, identical on the server and in the browser:
 *
 * - thunk: `new URL(modulePath, importer).pathname`, so
 *   `/abs/path/client/src/three-d/blocks/TextBlock` on the server and
 *   `/src/three-d/blocks/TextBlock` in the browser (Vite dev). We cut both
 *   down to the part from `/src/` on. (With webpack/Next, `import.meta.url`
 *   is the build-time `file://` path in both bundles, so the ids already
 *   match.)
 * - string (Server 3D): the string itself.
 */
export function getModuleId(ref: unknown): string {
  if (typeof ref === "string") return ref;
  if (typeof ref === "function") {
    const { modulePath, importer } = ref as ModuleThunk;
    if (modulePath == null || importer == null) {
      throw new Error("3D: module thunk without `modulePath` (check moduleImportConfig.statement)");
    }
    const raw = new URL(modulePath, importer).pathname;
    const i = raw.lastIndexOf("/src/");
    return i === -1 ? raw : raw.slice(i);
  }
  throw new Error(`3D: unsupported module reference ${String(ref)}`);
}

/**
 * Registers how to load a module id. Thunks register themselves the first
 * time they pass through here. Server 3D string references need an explicit
 * registry (see `server3d/registry.ts`), because the server only sends a
 * name.
 */
export function registerModule(id: string, thunk: () => Promise<unknown>) {
  if (!thunksById.has(id)) thunksById.set(id, thunk);
}

export function isModuleRegistered(id: string) {
  return thunksById.has(id);
}

/** The thunk registered for an id (used to revive serialized references). */
export function getRegisteredThunk(id: string): (() => Promise<unknown>) | undefined {
  return thunksById.get(id);
}

function toThunk(ref: unknown): { id: string; thunk: () => Promise<unknown> } {
  const id = getModuleId(ref);
  if (typeof ref === "function") registerModule(id, ref as ModuleThunk);
  const thunk = thunksById.get(id);
  if (thunk == null) throw new Error(`3D: no loader registered for module "${id}"`);
  return { id, thunk };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const isServer = typeof window === "undefined";

function unwrap(mod: unknown): unknown {
  // `export default` for components and for Relay artifacts
  // (eagerEsModules: true).
  return mod != null && typeof mod === "object" && "default" in mod
    ? (mod as { default: unknown }).default
    : mod;
}

/** Kicks off (or reuses) the download of a module. Never throws synchronously. */
export function loadModule(ref: unknown): Promise<unknown> {
  let id: string;
  let thunk: () => Promise<unknown>;
  try {
    ({ id, thunk } = toThunk(ref));
  } catch (error) {
    return Promise.reject(error);
  }
  return loadById(id, thunk);
}

function loadById(id: string, thunk: () => Promise<unknown>): Promise<unknown> {
  const existing = cache.get(id);
  if (existing) return existing.promise;

  emit("chunk:start", id);
  const delay = isServer ? 0 : settings.chunkDelayMs;
  const promise = (delay > 0 ? sleep(delay) : Promise.resolve()).then(thunk).then(unwrap);
  const entry: Entry = { status: "pending", promise };
  cache.set(id, entry);
  promise.then(
    (value) => {
      cache.set(id, { status: "fulfilled", value, promise });
      emit("chunk:end", id);
    },
    (error) => {
      cache.set(id, { status: "rejected", error, promise });
      emit("chunk:error", `${id}: ${String(error)}`);
    },
  );
  return promise;
}

/** Synchronous lookup: the module if it has already finished loading. */
export function peekModule(ref: unknown): unknown {
  let id: string;
  try {
    id = toThunk(ref).id;
  } catch {
    return undefined;
  }
  const entry = cache.get(id);
  return entry?.status === "fulfilled" ? entry.value : undefined;
}

/**
 * Suspense-style read: returns the module, throws the pending promise or
 * throws the load error. Used as `MatchContainer`'s `loader`, which runs
 * during render.
 */
export function readModule(ref: unknown): unknown {
  const promise = loadModule(ref);
  const entry = cache.get(getModuleId(ref));
  if (entry == null) throw promise; // unregistered id: loadModule rejected
  if (entry.status === "fulfilled") return entry.value;
  if (entry.status === "rejected") throw entry.error;
  throw entry.promise;
}

/** Ids of every module this runtime has finished loading, in order. */
export function getLoadedModuleIds(): string[] {
  return [...cache.entries()].filter(([, e]) => e.status === "fulfilled").map(([id]) => id);
}

/**
 * Preloads by id. Used on hydration: the server tells the browser which
 * modules it used, and the browser loads them before `hydrateRoot` so every
 * `operationLoader.get` and `loader` call can be answered synchronously.
 */
export function preloadModuleIds(ids: readonly string[]): Promise<unknown[]> {
  return Promise.all(
    ids.map((id) => {
      const thunk = thunksById.get(id);
      if (thunk == null) return Promise.reject(new Error(`3D: cannot preload unknown "${id}"`));
      return loadById(id, thunk);
    }),
  );
}

/** Lab only: forget everything so the next run downloads again. */
export function resetModuleCache() {
  cache.clear();
}
