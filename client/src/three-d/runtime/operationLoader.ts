import type { OperationLoader } from "relay-runtime";
import { emit } from "./events.js";
import {
  getLoadedModuleIds,
  getModuleId,
  isModuleRegistered,
  loadModule,
  peekModule,
  preloadModuleIds,
  registerModule,
  type ModuleThunk,
} from "./moduleRef.js";

/**
 * The `operationLoader` Relay needs for any `@module` usage. It resolves an
 * *operation reference* (the `__module_operation_<key>` value) to the
 * `SplitOperation` normalization AST of the matched fragment
 * (`<Fragment>$normalization.graphql`).
 *
 * Relay calls it from four places, and the sync/async split matters for each:
 *
 * | caller                         | method | if `get` returns null                          |
 * |--------------------------------|--------|------------------------------------------------|
 * | OperationExecutor (network)    | get    | falls back to `load`; the 3D subtree is        |
 * |                                |        | normalized later and the request stays active  |
 * | DataChecker (`environment.check`, store-or-network, usePreloadedQuery) | get | reports **missing**: refetch/suspend |
 * | RelayReferenceMarker (GC)      | get    | the subtree isn't marked, so it **can be GC'd** |
 * | optimistic updates             | get    | applied async                                  |
 *
 * So `get` must answer synchronously for anything that has already been
 * loaded. That's what the cache in `moduleRef.ts` is for.
 */
export const operationLoader: OperationLoader = {
  get(reference) {
    const node = peekModule(reference);
    if (node == null) {
      emitMissOnce(reference);
      return null;
    }
    registerNestedModules(node);
    return node as ReturnType<OperationLoader["get"]>;
  },
  load(reference) {
    return loadModule(reference).then((node) => {
      registerNestedModules(node);
      return node as Awaited<ReturnType<OperationLoader["load"]>>;
    });
  },
};

const missed = new Set<string>();
function emitMissOnce(reference: unknown) {
  let id: string;
  try {
    id = getModuleId(reference);
  } catch {
    id = String(reference);
  }
  if (missed.has(id)) return;
  missed.add(id);
  emit("loader:get-miss", id);
}

const walked = new WeakSet<object>();

/**
 * Walks a normalization AST (a query's or a split operation's) and registers
 * the module thunks of every `ModuleImport` node in it. On hydration, the
 * browser only receives module *ids* from the server. This is how it learns
 * which thunk loads each id, without a hand-maintained registry: the
 * thunks are already in the artifacts.
 */
export function registerNestedModules(node: unknown) {
  if (node == null || typeof node !== "object" || walked.has(node)) return;
  walked.add(node);
  const record = node as Record<string, unknown>;
  if (record.kind === "ModuleImport") {
    for (const key of ["componentModuleProvider", "operationModuleProvider"]) {
      const thunk = record[key] as ModuleThunk | undefined;
      if (typeof thunk === "function") registerModule(getModuleId(thunk), thunk);
    }
  }
  for (const value of Object.values(record)) {
    if (value != null && typeof value === "object") registerNestedModules(value);
  }
}

/**
 * Preloads module ids reported by the server, including nested ones. A
 * nested split operation's thunk only becomes known once its parent split
 * operation has loaded and been walked, so this runs in rounds.
 */
export async function preloadAll(ids: readonly string[]) {
  const pending = new Set(ids);
  for (;;) {
    const loaded = new Set(getLoadedModuleIds());
    const ready = [...pending].filter((id) => isModuleRegistered(id) && !loaded.has(id));
    if (ready.length === 0) break;
    const modules = await preloadModuleIds(ready);
    modules.forEach(registerNestedModules);
    ready.forEach((id) => pending.delete(id));
  }
  return [...pending].filter((id) => !new Set(getLoadedModuleIds()).has(id));
}
