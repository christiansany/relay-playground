import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Environment, RelayFieldLogger } from "relay-runtime";

type RelayFieldLoggerEvent = Parameters<RelayFieldLogger>[0];
import { GRAPHQL_ENDPOINT } from "../RelayEnvironment.js";
import { createLabEnvironment, type IdErrorGuard } from "./createLabEnvironment.js";
import {
  httpTransport,
  type ErrorBehavior,
  type GraphQLTransport,
  type NetworkExchange,
} from "./errorBehavior.js";

type Lab = {
  readonly onError: ErrorBehavior;
  readonly setOnError: (behavior: ErrorBehavior) => void;
  readonly guard: IdErrorGuard;
  readonly setGuard: (guard: IdErrorGuard) => void;
  readonly environment: Environment;
  /** Bumped whenever the environment is replaced; use as a React key to remount. */
  readonly generation: number;
  readonly resetStore: () => void;
  readonly resetServer: () => Promise<void>;
};

/**
 * What happened in the lab environment. Kept in its own context on purpose:
 * Relay calls `relayFieldLogger` from the render of every component that
 * reads an errored field, on every render. If these values lived in `Lab`,
 * logging would re-render the scenarios, which would log again, forever.
 * Only the inspector (no Relay hooks) may consume this.
 */
type LabActivity = {
  readonly exchanges: readonly NetworkExchange[];
  readonly fieldLogs: readonly RelayFieldLoggerEvent[];
  /** Bumped after every store publish, so the inspector can re-read the store. */
  readonly storeVersion: number;
};

const LabContext = createContext<Lab | null>(null);
const LabActivityContext = createContext<LabActivity | null>(null);

export function useLab(): Lab {
  const lab = useContext(LabContext);
  if (lab == null) throw new Error("useLab() outside <LabProvider>");
  return lab;
}

/** Don't call this from a component that renders Relay hooks (see `LabActivity`). */
export function useLabActivity(): LabActivity {
  const activity = useContext(LabActivityContext);
  if (activity == null) throw new Error("useLabActivity() outside <LabProvider>");
  return activity;
}

const MAX_LOG = 40;
const defaultTransport = httpTransport(GRAPHQL_ENDPOINT);

/**
 * A dedicated Relay environment for the error lab, so experiments don't leak
 * into the rest of the playground. `onError` is read per request; changing
 * the guard (which may swap `getDataID`) or resetting creates a new
 * environment with an empty store.
 */
export function LabProvider({
  children,
  transport = defaultTransport,
}: {
  children: ReactNode;
  /** Defaults to HTTP against the dev server; tests run the schema in-process. */
  transport?: GraphQLTransport;
}) {
  const [onError, setOnErrorState] = useState<ErrorBehavior>("NULL");
  const onErrorRef = useRef(onError);
  const [guard, setGuardState] = useState<IdErrorGuard>("none");
  const [generation, setGeneration] = useState(0);
  const [exchanges, setExchanges] = useState<NetworkExchange[]>([]);
  const [fieldLogs, setFieldLogs] = useState<RelayFieldLoggerEvent[]>([]);
  const [storeVersion, setStoreVersion] = useState(0);

  // Relay calls these during render and store publishes; defer the React
  // updates so we never set state while another component renders.
  const makeEnvironment = useCallback(
    (forGuard: IdErrorGuard) => {
      // react-relay calls `relayFieldLogger` from the render of every component
      // that reads an errored field, on *every* render, including renders React
      // throws away and retries. Scheduling a state update for each call
      // interrupts that render, the retry logs again, and the tab freezes. So
      // only distinct events reach React state.
      const loggedFieldEvents = new Set<string>();
      return createLabEnvironment({
        transport,
        getOnError: () => onErrorRef.current,
        guard: forGuard,
        onExchange: (e) => queueMicrotask(() => setExchanges((xs) => [e, ...xs].slice(0, MAX_LOG))),
        relayFieldLogger: (e) => {
          const key = JSON.stringify(e);
          if (loggedFieldEvents.has(key)) return;
          loggedFieldEvents.add(key);
          queueMicrotask(() => setFieldLogs((xs) => [e, ...xs].slice(0, MAX_LOG)));
        },
        log: (e) => {
          if (e.name === "store.notify.complete" || e.name === "store.gc.end") {
            queueMicrotask(() => setStoreVersion((v) => v + 1));
          }
        },
      });
    },
    [transport],
  );
  const [environment, setEnvironment] = useState(() => makeEnvironment("none"));

  const replaceEnvironment = useCallback(
    (forGuard: IdErrorGuard) => {
      setEnvironment(makeEnvironment(forGuard));
      setExchanges([]);
      setFieldLogs([]);
      setGeneration((g) => g + 1);
    },
    [makeEnvironment],
  );

  const setOnError = useCallback((behavior: ErrorBehavior) => {
    onErrorRef.current = behavior;
    setOnErrorState(behavior);
  }, []);

  const setGuard = useCallback(
    (next: IdErrorGuard) => {
      setGuardState(next);
      replaceEnvironment(next);
    },
    [replaceEnvironment],
  );

  const resetStore = useCallback(() => replaceEnvironment(guard), [replaceEnvironment, guard]);

  const resetServer = useCallback(async () => {
    await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "mutation LabReset { labReset }" }),
    });
    resetStore();
  }, [resetStore]);

  const value = useMemo<Lab>(
    () => ({
      onError,
      setOnError,
      guard,
      setGuard,
      environment,
      generation,
      resetStore,
      resetServer,
    }),
    [onError, setOnError, guard, setGuard, environment, generation, resetStore, resetServer],
  );
  const activity = useMemo<LabActivity>(
    () => ({ exchanges, fieldLogs, storeVersion }),
    [exchanges, fieldLogs, storeVersion],
  );

  return (
    <LabContext.Provider value={value}>
      <LabActivityContext.Provider value={activity}>{children}</LabActivityContext.Provider>
    </LabContext.Provider>
  );
}
