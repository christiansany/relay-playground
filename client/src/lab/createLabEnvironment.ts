import {
  Environment,
  Network,
  RecordSource,
  Store,
  type GraphQLResponse,
  type LogFunction,
  type RelayFieldLogger,
} from "relay-runtime";
import { missingFieldHandlers } from "../RelayEnvironment.js";
import {
  createFetchFn,
  type ErrorBehavior,
  type GraphQLTransport,
  type NetworkExchange,
} from "./errorBehavior.js";
import { createNullIdSafeGetDataID, propagateIdErrors } from "./idErrorGuards.js";

/**
 * Which client-side mitigation (if any) to apply for errors on `id`:
 * - `none`: Relay's stock behavior.
 * - `propagateIdErrors`: rewrite responses so `id` errors propagate like
 *   `PROPAGATE` would (mitigation A in `idErrorGuards.ts`).
 * - `nullIdSafeGetDataID`: give objects with an error-null `id` a fresh
 *   client id (mitigation B in `idErrorGuards.ts`).
 */
export type IdErrorGuard = "none" | "propagateIdErrors" | "nullIdSafeGetDataID";

export type LabEnvironmentOptions = {
  readonly transport: GraphQLTransport;
  readonly getOnError: () => ErrorBehavior;
  readonly guard?: IdErrorGuard;
  readonly onExchange?: (exchange: NetworkExchange) => void;
  readonly relayFieldLogger?: RelayFieldLogger;
  readonly log?: LogFunction;
};

export function createLabEnvironment({
  transport,
  getOnError,
  guard = "none",
  onExchange,
  relayFieldLogger,
  log,
}: LabEnvironmentOptions): Environment {
  const transform: ((r: GraphQLResponse) => GraphQLResponse) | null =
    guard === "propagateIdErrors" ? (r) => propagateIdErrors(r) : null;
  const getDataID = guard === "nullIdSafeGetDataID" ? createNullIdSafeGetDataID() : undefined;
  return new Environment({
    network: Network.create(
      createFetchFn({ transport, getOnError, getTransformResponse: () => transform, onExchange }),
    ),
    // relay-runtime accepts `getDataID` on the Store too (used when checking
    // availability); @types/relay-runtime doesn't declare it yet.
    store: new Store(new RecordSource(), (getDataID != null ? { getDataID } : undefined) as never),
    ...(getDataID != null ? { getDataID } : {}),
    missingFieldHandlers,
    relayFieldLogger: relayFieldLogger ?? (() => {}),
    log,
  });
}
