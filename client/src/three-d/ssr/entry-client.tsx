import { createRoot, hydrateRoot } from "react-dom/client";
import { loadQuery } from "react-relay";
import { createOperationDescriptor } from "relay-runtime";
import { createThreeDEnvironment } from "../runtime/createThreeDEnvironment.js";
import { getEvents, subscribeEvents } from "../runtime/events.js";
import { preloadAll, registerNestedModules } from "../runtime/operationLoader.js";
import { settings } from "../runtime/settings.js";
import { Server3DSsrPageQueryNode } from "../server3d/Server3DSsrPage.js";
import { isServer3DMode, modes, parseRecordsWithRefs, type SsrPayload } from "./protocol.js";
import { SsrApp } from "./SsrApp.js";
import { SsrPageQueryNode } from "./SsrPage.js";

declare global {
  interface Window {
    __3D_SSR__: SsrPayload;
    __3D_METRICS__: Metrics;
  }
}

type Metrics = {
  mode: string;
  httpRequests: string[];
  recoverableErrors: string[];
  preloadMs: number | null;
  unresolvedPreloads: string[];
  checkBeforeHydrate: string;
  hydrateStartedAt: number;
  lastBlockCommitAt: number | null;
};

// No artificial latency unless `?chunkDelay=ms` simulates a CDN round trip
// for 3D chunks.
settings.chunkDelayMs = Number(new URLSearchParams(location.search).get("chunkDelay") ?? 0);
settings.networkDelayMs = 0;

const payload = window.__3D_SSR__;
const container = document.getElementById("root")!;
const metrics: Metrics = {
  mode: payload.mode,
  httpRequests: [],
  recoverableErrors: [],
  preloadMs: null,
  unresolvedPreloads: [],
  checkBeforeHydrate: "n/a",
  hydrateStartedAt: 0,
  lastBlockCommitAt: null,
};
window.__3D_METRICS__ = metrics;

async function main() {
  const { mode, slug } = payload;
  const query = isServer3DMode(mode) ? Server3DSsrPageQueryNode : SsrPageQueryNode;
  const variables = { slug };

  // 1. Learn the module thunks the query's artifact knows about. (For
  //    Server 3D, the registry module did that when it was imported.)
  registerNestedModules(query);

  // 2. Preload every 3D module the server used, *before* hydrating, so
  //    operationLoader.get() and MatchContainer's loader answer synchronously
  //    during hydration.
  const shouldPreload = !mode.endsWith("no-preload") && mode !== "snapshot-naive" && mode !== "csr";
  if (shouldPreload) {
    const t = performance.now();
    metrics.unresolvedPreloads = await preloadAll(payload.modules);
    metrics.preloadMs = Math.round(performance.now() - t);
  }

  // 3. Rebuild the Relay state.
  let records;
  if (payload.recordsJson != null) {
    records =
      mode === "snapshot-revived"
        ? parseRecordsWithRefs(payload.recordsJson)
        : JSON.parse(payload.recordsJson);
  }
  const environment = createThreeDEnvironment({
    replayFrom: payload.responses,
    records,
    onHttpRequest: (name) => metrics.httpRequests.push(name),
  });
  metrics.checkBeforeHydrate = environment.check(
    createOperationDescriptor(query, variables),
  ).status;

  // store-or-network: what a hydrating page does. "missing" means a real
  // HTTP request (or, with replay, the replayed response).
  const queryRef = loadQuery(environment, query, variables, { fetchPolicy: "store-or-network" });
  const app = <SsrApp environment={environment} queryRef={queryRef} mode={mode} />;

  metrics.hydrateStartedAt = Math.round(performance.now());
  if (mode === "csr") {
    container.innerHTML = "";
    createRoot(container).render(app);
  } else {
    hydrateRoot(container, app, {
      onRecoverableError(error) {
        metrics.recoverableErrors.push(String((error as Error)?.message ?? error));
        renderPanel();
      },
    });
  }
}

subscribeEvents(() => {
  const commits = getEvents().filter((e) => e.kind === "render");
  if (commits.length > 0) metrics.lastBlockCommitAt = Math.round(performance.now());
  renderPanel();
});

/** Diagnostics panel, plain DOM outside the React root (no hydration impact). */
function renderPanel() {
  let panel = document.getElementById("panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "panel";
    document.body.appendChild(panel);
  }
  const events = getEvents()
    .map((e) => `${String(e.t).padStart(5)}ms ${e.kind.padEnd(16)} ${e.label}`)
    .join("\n");
  panel.innerHTML = `
    <h3>Hydration metrics: ${modes[payload.mode]}</h3>
    <pre id="metrics">${JSON.stringify(
      {
        ...metrics,
        serverRenderMs: payload.serverRenderMs,
        modulesReportedByServer: payload.modules.length,
        hydrateToLastCommitMs:
          metrics.lastBlockCommitAt == null
            ? null
            : metrics.lastBlockCommitAt - metrics.hydrateStartedAt,
      },
      null,
      2,
    )}</pre>
    <details open><summary>client event log</summary><pre>${events.replace(/</g, "&lt;")}</pre></details>`;
}

main().catch((error) => {
  metrics.recoverableErrors.push(`main(): ${String(error)}`);
  renderPanel();
});
