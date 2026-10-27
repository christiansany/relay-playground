import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store,
  type FetchFunction,
  type GraphQLResponse,
  type LogEvent,
} from "relay-runtime";
import { emit } from "./events.js";
import { loadModule, isModuleRegistered } from "./moduleRef.js";
import { operationLoader } from "./operationLoader.js";
import { settings } from "./settings.js";

const GRAPHQL_ENDPOINT =
  (import.meta.env.VITE_GRAPHQL_ENDPOINT as string | undefined) ?? "http://localhost:4000/graphql";
const isServer = typeof window === "undefined";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export type RecordedResponse = { cacheKey: string; response: GraphQLResponse };

export function requestCacheKey(name: string, variables: Record<string, unknown>) {
  return `${name}:${JSON.stringify(variables)}`;
}

export type ThreeDEnvironmentOptions = {
  /** SSR: every response the server-side environment received, in order. */
  recordInto?: RecordedResponse[];
  /**
   * Hydration: responses recorded on the server. A request whose cache key
   * matches is answered from here once, without touching the network.
   */
  replayFrom?: RecordedResponse[];
  /** Hydration via store snapshot: initial records. */
  records?: ConstructorParameters<typeof RecordSource>[0];
  /** Called for every real HTTP request (lab metrics). */
  onHttpRequest?: (name: string) => void;
};

/**
 * Relay environment for the 3D lab, shared by CSR and SSR. Only two
 * 3D-specific settings matter:
 *
 * - `operationLoader` on **both** Environment and Store. It's required as
 *   soon as any `@module` is used: OperationExecutor (Environment) and
 *   DataChecker/GC (Store) each throw an invariant without it.
 * - in the network layer, for Server 3D: preload what the server lists in
 *   `extensions.jsModules`.
 *
 * Everything else is instrumentation.
 */
export function createThreeDEnvironment(options: ThreeDEnvironmentOptions = {}) {
  const replay = new Map((options.replayFrom ?? []).map((r) => [r.cacheKey, r.response]));

  const fetchFn: FetchFunction = (request, variables) => {
    const cacheKey = requestCacheKey(request.name, variables);
    const replayed = replay.get(cacheKey);
    if (replayed) {
      replay.delete(cacheKey);
      emit("network:replay", request.name);
      // Synchronous on purpose: on hydration the data must be in the store
      // before the first render reads it.
      return Observable.from(replayed);
    }
    return Observable.create<GraphQLResponse>((sink) => {
      const controller = new AbortController();
      emit("network:start", request.name);
      options.onHttpRequest?.(request.name);
      (async () => {
        if (!isServer && settings.networkDelayMs > 0) await sleep(settings.networkDelayMs);
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-3d-variant": settings.serverVariant },
          body: JSON.stringify({ query: request.text, variables }),
          signal: controller.signal,
        });
        const json = (await res.json()) as GraphQLResponse;
        emit("network:end", request.name);
        preloadFromExtensions(json);
        options.recordInto?.push({ cacheKey, response: json });
        sink.next(json);
        sink.complete();
      })().catch((err) => {
        if (!sink.closed) sink.error(err);
      });
      return () => controller.abort();
    });
  };

  return new Environment({
    network: Network.create(fetchFn),
    // The Store needs its own operationLoader. `store.check()` (DataChecker)
    // and GC (RelayReferenceMarker) use it to look inside 3D subtrees, and
    // throw an invariant without it. Passing it only to the Environment (as
    // the docs suggest) only covers the executor.
    store: new Store(new RecordSource(options.records), { operationLoader }),
    operationLoader,
    log: logRelayEvent,
    isServer,
  });
}

/**
 * Server 3D only. The server has already decided which modules this payload
 * needs (`threeDPlugin` on the server). Starting the downloads here, rather
 * than waiting for the normalizer (operation refs) or MatchContainer
 * (component refs), removes a round trip from the waterfall.
 */
function preloadFromExtensions(json: GraphQLResponse) {
  if (!settings.preloadFromExtensions || !("extensions" in json)) return;
  const modules = (json.extensions as { jsModules?: string[] } | undefined)?.jsModules;
  for (const id of modules ?? []) {
    if (isModuleRegistered(id)) {
      emit("info", `preload from extensions: ${id}`);
      void loadModule(id).catch(() => {});
    }
  }
}

const executeNames = new Map<number, string>();

function logRelayEvent(event: LogEvent) {
  switch (event.name) {
    case "execute.start":
      executeNames.set(event.executeId, event.params.name);
      emit("relay", `execute.start ${event.params.name}`);
      break;
    case "execute.next.start":
      emit(
        "relay",
        `execute.next (normalize + publish) ${event.operation.request.node.params.name}`,
      );
      break;
    case "execute.async.module":
      emit(
        "relay",
        `execute.async.module ${event.operationName} (${Math.round(event.duration)}ms)`,
      );
      break;
    case "execute.complete":
      // Completes only after every async @module normalization finished.
      emit("relay", `execute.complete ${executeNames.get(event.executeId) ?? ""}`);
      break;
    case "store.gc.end":
      emit("relay", `store.gc (${event.references.size} records kept)`);
      break;
  }
}
