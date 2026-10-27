import {
  commitMutation,
  createOperationDescriptor,
  getRequest,
  getSelector,
  handlePotentialSnapshotErrors,
  type GraphQLTaggedNode,
  type MutationParameters,
  type OperationDescriptor,
  type OperationType,
  type PayloadError,
  type RelayFieldLogger,
  type SelectorStoreUpdater,
  type Snapshot,
} from "relay-runtime";
import { resetMockData } from "../../../../server/src/data/mockData.js";
import { runRequest } from "../../../../server/src/errorBehavior.js";
import { schemas } from "../../../../server/src/schema.js";
import { createLabEnvironment, type IdErrorGuard } from "../createLabEnvironment.js";
import type { ErrorBehavior, NetworkExchange } from "../errorBehavior.js";
import { diagnoseStore, type RecordMap } from "../storeDiagnostics.js";

type RelayFieldLoggerEvent = Parameters<RelayFieldLogger>[0];

/**
 * A Relay environment wired to the real playground schema, executed
 * in-process (no HTTP). The server's `onError` emulation, `@simulateError`
 * and mutations all behave exactly like in `yarn dev`.
 */
export function createHarness({
  onError = "PROPAGATE",
  guard = "none",
}: { onError?: ErrorBehavior; guard?: IdErrorGuard } = {}) {
  resetMockData();
  let currentOnError = onError;
  const exchanges: NetworkExchange[] = [];
  const fieldLogs: RelayFieldLoggerEvent[] = [];
  const environment = createLabEnvironment({
    transport: (body) => runRequest(schemas, body),
    getOnError: () => currentOnError,
    guard,
    onExchange: (e) => exchanges.push(e),
    relayFieldLogger: (e) => fieldLogs.push(e),
  });

  function records(): RecordMap {
    return environment.getStore().getSource().toJSON() as RecordMap;
  }

  /** The message Relay would throw while rendering this snapshot, or `null`. */
  function readError(snapshot: Snapshot): string | null {
    try {
      // @types/relay-runtime (20.x) still has the old signature and no `fieldErrors`.
      (handlePotentialSnapshotErrors as unknown as (env: unknown, errors: unknown) => void)(
        environment,
        (snapshot as Snapshot & { fieldErrors?: unknown }).fieldErrors,
      );
      return null;
    } catch (e) {
      return (e as Error).message;
    }
  }

  async function withOnError<T>(behavior: ErrorBehavior | undefined, run: () => Promise<T>) {
    const previous = currentOnError;
    if (behavior != null) currentOnError = behavior;
    try {
      return await run();
    } finally {
      currentOnError = previous;
    }
  }

  /** Fetches (network-only) and retains a query, like a mounted component would. */
  async function query<T extends OperationType>(
    taggedNode: GraphQLTaggedNode,
    variables: T["variables"],
    options: { onError?: ErrorBehavior } = {},
  ) {
    const operation = createOperationDescriptor(getRequest(taggedNode), variables, { force: true });
    environment.retain(operation);
    let networkError: Error | null = null;
    await withOnError(options.onError, async () => {
      try {
        await environment.execute({ operation }).toPromise();
      } catch (e) {
        networkError = e as Error;
      }
    });
    return { operation, networkError: networkError as Error | null, ...read<T>(operation) };
  }

  /** Reads a query from the store (no network). */
  function read<T extends OperationType>(operation: OperationDescriptor) {
    const snapshot = environment.lookup(operation.fragment);
    return {
      snapshot,
      data: snapshot.data as T["response"],
      readError: readError(snapshot),
    };
  }

  /** Reads a query from the store without fetching it (like `store-only`). */
  function lookup<T extends OperationType>(
    taggedNode: GraphQLTaggedNode,
    variables: T["variables"],
  ) {
    const operation = createOperationDescriptor(getRequest(taggedNode), variables);
    return { operation, availability: environment.check(operation), ...read<T>(operation) };
  }

  /** Reads a fragment from the store via a fragment reference. */
  function readFragment<TData>(fragment: GraphQLTaggedNode, fragmentRef: unknown) {
    const selector = getSelector(fragment as never, fragmentRef);
    if (selector == null || selector.kind !== "SingularReaderSelector") {
      throw new Error("readFragment: expected a singular fragment reference");
    }
    const snapshot = environment.lookup(selector);
    return { snapshot, data: snapshot.data as TData, readError: readError(snapshot) };
  }

  function mutate<T extends MutationParameters>(
    mutation: GraphQLTaggedNode,
    config: {
      variables: T["variables"];
      onError?: ErrorBehavior;
      optimisticResponse?: T["rawResponse"] | T["response"];
      optimisticUpdater?: SelectorStoreUpdater<T["response"]>;
      updater?: SelectorStoreUpdater<T["response"]>;
    },
  ) {
    return withOnError(
      config.onError,
      () =>
        new Promise<{
          data: T["response"] | null;
          errors: readonly PayloadError[] | null;
          error: Error | null;
        }>((resolve) => {
          commitMutation<T>(environment, {
            mutation,
            variables: config.variables,
            optimisticResponse: config.optimisticResponse as never,
            optimisticUpdater: config.optimisticUpdater,
            updater: config.updater,
            onCompleted: (data, errors) => resolve({ data, errors: errors ?? null, error: null }),
            onError: (error) => resolve({ data: null, errors: null, error }),
          });
        }),
    );
  }

  return {
    environment,
    exchanges,
    fieldLogs,
    setOnError(behavior: ErrorBehavior) {
      currentOnError = behavior;
    },
    records,
    record: (dataID: string) => records()[dataID],
    /** Store diagnostics, with per-commit mutation roots normalized for stable snapshots. */
    issues: () => diagnoseStore(records()).map((i) => ({ ...i, dataID: stableClientID(i.dataID) })),
    lastResponse: () => exchanges[exchanges.length - 1]?.response,
    query,
    read,
    lookup,
    readFragment,
    mutate,
  };
}

export type Harness = ReturnType<typeof createHarness>;

/** `client:local:17:...` -> `client:local:<n>:...` (the counter is global to relay-runtime). */
export const stableClientID = (dataID: string) =>
  dataID.replace(/^client:local:\d+/, "client:local:<n>");

/**
 * What reading an errored field under @throwOnFieldError throws. relay-runtime
 * 21.0.1: "Unexpected response payload - check server logs for details.";
 * facebook/relay main: "Received a field error in the server response for
 * field '<path>' in '<owner>'. Message: <server message>".
 */
export const THROWN_FIELD_ERROR =
  /^Relay: (Unexpected response payload|Received a field error in the server response)/;

/** Relay global ids as the server encodes them. */
export const gid = (type: string, id: string) => btoa(`${type}:${id}`);
