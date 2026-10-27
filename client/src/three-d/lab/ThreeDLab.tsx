import {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { loadQuery, RelayEnvironmentProvider, type PreloadedQuery } from "react-relay";
import {
  createOperationDescriptor,
  type Environment,
  type FetchPolicy,
  type OperationType,
} from "relay-runtime";
import { lazySwitchBaselineDemo } from "../demos/LazySwitchBaselineDemo.js";
import { matchStrategyDemo } from "../demos/MatchStrategyDemo.js";
import { multipleKeysDemo } from "../demos/MultipleKeysDemo.js";
import { nonReactModuleDemo } from "../demos/NonReactModuleDemo.js";
import { nullableFieldDemo } from "../demos/NullableFieldDemo.js";
import type { Demo } from "../demos/types.js";
import { unionBlocksDemo } from "../demos/UnionBlocksDemo.js";
import { createThreeDEnvironment } from "../runtime/createThreeDEnvironment.js";
import {
  emit,
  getEvents,
  resetEvents,
  subscribeEvents,
  type ThreeDEvent,
} from "../runtime/events.js";
import { getModuleId, resetModuleCache } from "../runtime/moduleRef.js";
import { settings } from "../runtime/settings.js";
import { server3dDemo } from "../server3d/Server3DDemo.js";
import { client3dDemo } from "../server3d/client3d/client3dDemoEntry.js";

const demos: Demo[] = [
  unionBlocksDemo,
  nullableFieldDemo,
  matchStrategyDemo,
  multipleKeysDemo,
  nonReactModuleDemo,
  server3dDemo,
  client3dDemo,
  lazySwitchBaselineDemo,
] as Demo[];

const slugs = ["espresso-machine", "noise-cancelling-headphones", "paper-notebook"];

type Run = {
  environment: Environment;
  queryRef: PreloadedQuery<OperationType>;
  demo: Demo;
  key: number;
};

export function ThreeDLab() {
  const [demoId, setDemoId] = useState(demos[0].id);
  const demo = demos.find((d) => d.id === demoId)!;
  const [slug, setSlug] = useState(demo.slug);
  const [run, setRun] = useState<Run | null>(null);
  const [httpCount, setHttpCount] = useState(0);
  const runKey = useRef(0);

  useEffect(() => () => run?.queryRef.dispose(), [run]);

  function start(kind: "cold" | "warm") {
    const fetchPolicy: FetchPolicy = kind === "cold" ? "network-only" : "store-or-network";
    let environment = run?.environment;
    if (kind === "cold" || environment == null || run?.demo !== demo) {
      resetModuleCache();
      environment = createThreeDEnvironment({ onHttpRequest: () => setHttpCount((c) => c + 1) });
      setHttpCount(0);
    }
    resetEvents();
    emit(
      "info",
      `${kind} run: ${demo.query.params.name}(slug: "${slug}"), fetchPolicy=${fetchPolicy}`,
    );
    if (kind === "warm") {
      // What store-or-network does under the hood: DataChecker walks the
      // normalization AST, and for every 3D record it calls
      // operationLoader.get(). If that isn't synchronous, the data counts as
      // missing.
      const availability = environment.check(createOperationDescriptor(demo.query, { slug }));
      emit("info", `environment.check() → ${availability.status}`);
    }
    const queryRef = loadQuery(environment, demo.query, demo.Standalone ? {} : { slug }, {
      fetchPolicy: demo.Standalone ? "store-only" : fetchPolicy,
    });
    setRun({ environment, queryRef, demo, key: ++runKey.current });
  }

  return (
    <div className="three-d-lab">
      <style>{css}</style>
      <h1>Data-Driven Dependencies (3D) lab: CSR</h1>
      <p>
        Read <code>docs/data-driven-dependencies.md</code> first. SSR/hydration lives in a separate
        server: <code>yarn workspace client ssr</code> →{" "}
        <a href="http://localhost:5174/">http://localhost:5174/</a>.
      </p>
      <nav className="tabs">
        {demos.map((d) => (
          <button
            key={d.id}
            className={d.id === demoId ? "active" : ""}
            onClick={() => {
              setDemoId(d.id);
              setSlug(d.slug);
              setRun(null);
            }}
          >
            {d.title}
          </button>
        ))}
      </nav>
      <div className="explainer">{demo.explainer}</div>
      <Controls slug={slug} setSlug={setSlug} onRun={start} canWarm={run?.demo === demo} />
      <div className="grid">
        <section>
          <h2>Rendered</h2>
          {run ? (
            <RelayEnvironmentProvider environment={run.environment}>
              <LabErrorBoundary key={run.key}>
                <Suspense fallback={<p className="fallback">query suspended…</p>}>
                  {run.demo.Standalone ? (
                    <run.demo.Standalone />
                  ) : (
                    <run.demo.View queryRef={run.queryRef} />
                  )}
                </Suspense>
              </LabErrorBoundary>
            </RelayEnvironmentProvider>
          ) : (
            <p className="fallback">Press "cold run".</p>
          )}
          <p>
            HTTP requests in this environment: <b>{httpCount}</b>
          </p>
          {run && <GcControls environment={run.environment} queryRef={run.queryRef} />}
        </section>
        <section>
          <h2>Timeline</h2>
          <EventLog />
        </section>
      </div>
      {run && <Inspector environment={run.environment} demo={run.demo} />}
    </div>
  );
}

function Controls({
  slug,
  setSlug,
  onRun,
  canWarm,
}: {
  slug: string;
  setSlug: (s: string) => void;
  onRun: (kind: "cold" | "warm") => void;
  canWarm: boolean;
}) {
  const [, force] = useState(0);
  const update = (fn: () => void) => {
    fn();
    force((n) => n + 1);
  };
  return (
    <div className="controls">
      <label>
        product{" "}
        <select value={slug} onChange={(e) => setSlug(e.target.value)}>
          {slugs.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </label>
      <label>
        chunk latency{" "}
        <input
          type="number"
          step={100}
          value={settings.chunkDelayMs}
          onChange={(e) => update(() => (settings.chunkDelayMs = Number(e.target.value)))}
        />
        ms
      </label>
      <label>
        network latency{" "}
        <input
          type="number"
          step={100}
          value={settings.networkDelayMs}
          onChange={(e) => update(() => (settings.networkDelayMs = Number(e.target.value)))}
        />
        ms
      </label>
      <label title="Server 3D only">
        <input
          type="checkbox"
          checked={settings.preloadFromExtensions}
          onChange={(e) => update(() => (settings.preloadFromExtensions = e.target.checked))}
        />{" "}
        preload from <code>extensions.jsModules</code>
      </label>
      <label title="Server 3D only">
        server variant{" "}
        <select
          value={settings.serverVariant}
          onChange={(e) => update(() => (settings.serverVariant = e.target.value as "a" | "b"))}
        >
          <option>a</option>
          <option>b</option>
        </select>
      </label>
      <button onClick={() => onRun("cold")}>▶ cold run (new store, network-only)</button>
      <button disabled={!canWarm} onClick={() => onRun("warm")}>
        ▶ warm run (same store, store-or-network)
      </button>
    </div>
  );
}

function GcControls({
  environment,
  queryRef,
}: {
  environment: Environment;
  queryRef: PreloadedQuery<OperationType>;
}) {
  return (
    <p>
      <button
        onClick={() => {
          queryRef.dispose();
          // Not public API, but handy: run the GC now instead of on idle.
          (environment.getStore() as unknown as { __gc(): void }).__gc();
          emit("info", "disposed the query and ran GC (records only kept if retained elsewhere)");
        }}
      >
        dispose query + GC
      </button>
    </p>
  );
}

function EventLog() {
  const events = useSyncExternalStore(subscribeEvents, getEvents, getEvents);
  return (
    <ol className="events">
      {events.map((e: ThreeDEvent) => (
        <li key={e.seq} className={`ev-${e.kind.replace(":", "-")}`}>
          <span className="t">{String(e.t).padStart(5, " ")}ms</span>{" "}
          <span className="kind">{e.kind}</span> {e.label}
        </li>
      ))}
    </ol>
  );
}

/**
 * Store inspector: shows where 3D lives in the store. The matched record
 * gets `__module_component_<key>` / `__module_operation_<key>`. In compiler
 * mode these are functions, so `JSON.stringify` (= every "serialize the
 * store for SSR" approach) silently drops them.
 */
function Inspector({ environment, demo }: { environment: Environment; demo: Demo }) {
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [roundTrip, setRoundTrip] = useState<string | null>(null);
  const take = () => {
    const records = environment.getStore().getSource().toJSON();
    let refs = 0;
    let fnRefs = 0;
    const pretty = JSON.stringify(
      records,
      (key, value) => {
        if (key.startsWith("__module_")) {
          refs++;
          if (typeof value === "function") {
            fnRefs++;
            return `ƒ ${getModuleId(value)}`;
          }
        }
        return value;
      },
      2,
    );
    const survived = (JSON.stringify(records).match(/"__module_(component|operation)_/g) ?? [])
      .length;
    setSnapshot(pretty);
    setRoundTrip(
      `${refs} __module_* values in the store (${fnRefs} functions). After JSON.stringify: ${survived} left.`,
    );
  };
  return (
    <section>
      <h2>Inspector</h2>
      <details>
        <summary>Operation text sent to the server ({demo.query.params.name})</summary>
        <pre>{demo.query.params.text}</pre>
      </details>
      <button onClick={take}>snapshot store</button> {roundTrip && <b>{roundTrip}</b>}
      {snapshot && (
        <details open>
          <summary>store records</summary>
          <pre>{snapshot}</pre>
        </details>
      )}
    </section>
  );
}

class LabErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    return this.state.error ? (
      <pre style={{ color: "crimson" }}>{String(this.state.error.stack ?? this.state.error)}</pre>
    ) : (
      this.props.children
    );
  }
}

const css = `
.three-d-lab .tabs button { margin: 0 4px 4px 0; }
.three-d-lab .tabs button.active { font-weight: bold; background: #ddf; }
.three-d-lab .explainer { background: #f6f6f6; padding: 4px 12px; margin: 8px 0; }
.three-d-lab .controls { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin: 8px 0; }
.three-d-lab .controls input[type=number] { width: 70px; }
.three-d-lab .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.three-d-lab .fallback { color: #999; font-style: italic; }
.three-d-lab .block { display: block; margin: 6px 0; }
.three-d-lab .events { font: 12px ui-monospace, monospace; padding-left: 0; list-style: none; max-height: 480px; overflow: auto; }
.three-d-lab .events .t { color: #888; white-space: pre; }
.three-d-lab .events .kind { display: inline-block; min-width: 110px; font-weight: bold; }
.three-d-lab .ev-network-start .kind, .three-d-lab .ev-network-end .kind, .three-d-lab .ev-network-replay .kind { color: #06c; }
.three-d-lab .ev-chunk-start .kind, .three-d-lab .ev-chunk-end .kind { color: #a50; }
.three-d-lab .ev-loader-get-miss .kind { color: #c00; }
.three-d-lab .ev-render .kind { color: #080; }
.three-d-lab pre { max-height: 400px; overflow: auto; background: #fafafa; font-size: 11px; }
`;
