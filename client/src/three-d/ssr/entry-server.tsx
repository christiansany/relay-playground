/// <reference types="node" />
import { Transform, type Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { loadQuery } from "react-relay";
import {
  createThreeDEnvironment,
  type RecordedResponse,
} from "../runtime/createThreeDEnvironment.js";
import { Server3DSsrPageQueryNode } from "../server3d/Server3DSsrPage.js";
import {
  collectModuleIds,
  isServer3DMode,
  serializeForScript,
  stringifyRecordsWithRefs,
  type Mode,
  type SsrPayload,
} from "./protocol.js";
import { SsrApp } from "./SsrApp.js";
import { SsrPageQueryNode } from "./SsrPage.js";

/**
 * Streaming SSR for the 3D page, framework-agnostic (this is what Next.js's
 * App Router does for client components, minus the framework).
 *
 * On the server, the 3D machinery runs as in the browser: the normalizer
 * hits `ModuleImport`, `operationLoader.load()` imports the split operation
 * (a Node `import()` is fast but still async), and `MatchContainer`'s loader
 * suspends until the component module is imported. With streaming, each
 * block's `<Suspense>` boundary flushes as soon as its modules are in.
 *
 * Between React's chunks we inject `<link rel="modulepreload">` for every
 * 3D module the store references so far. The browser starts downloading
 * chunks while the HTML is still streaming. That's the "manual
 * `useServerInsertedHTML`" part: Relay artifacts use raw `import()`, so no
 * bundler/framework knows these chunks were used during SSR.
 */
export function render({
  slug,
  mode,
  res,
  head,
  tail,
  resolveUrl,
}: {
  slug: string;
  mode: Mode;
  res: Writable & { setHeader(name: string, value: string): void; statusCode: number };
  head: string;
  tail: string;
  /** Maps a module id to a URL the browser can preload (null if unknown). */
  resolveUrl: (id: string) => string | null;
}) {
  const started = performance.now();
  const recorded: RecordedResponse[] = [];
  const environment = createThreeDEnvironment({ recordInto: recorded });
  const query = isServer3DMode(mode) ? Server3DSsrPageQueryNode : SsrPageQueryNode;
  const queryRef = loadQuery(environment, query, { slug });
  const source = () =>
    environment.getStore().getSource().toJSON() as Parameters<typeof collectModuleIds>[0];

  const preloaded = new Set<string>();
  const preloadLinks = () => {
    let html = "";
    for (const id of collectModuleIds(source())) {
      if (preloaded.has(id)) continue;
      preloaded.add(id);
      const url = resolveUrl(id);
      if (url) html += `<link rel="modulepreload" href="${url}" data-3d="${id}">`;
    }
    return html;
  };

  const injector = new Transform({
    transform(chunk, _enc, callback) {
      // Links first, so they land before the boundary that needs them.
      callback(null, preloadLinks() + chunk.toString());
    },
    flush(callback) {
      const records = source();
      const payload: SsrPayload = {
        mode,
        slug,
        modules: collectModuleIds(records),
        serverRenderMs: Math.round(performance.now() - started),
      };
      if (mode === "replay" || mode === "replay-no-preload") payload.responses = recorded;
      if (mode === "snapshot-naive" || isServer3DMode(mode)) {
        // What most Next.js + Relay setups do. In compiler mode the module
        // refs are functions, so JSON.stringify silently drops them.
        payload.recordsJson = JSON.stringify(records);
      }
      if (mode === "snapshot-revived") payload.recordsJson = stringifyRecordsWithRefs(records);
      callback(
        null,
        `${preloadLinks()}<script>window.__3D_SSR__=${serializeForScript(payload)}</script>${tail}`,
      );
    },
  });
  injector.pipe(res);

  if (mode === "csr") {
    res.setHeader("content-type", "text/html; charset=utf-8");
    injector.write(head);
    injector.end();
    return;
  }

  const { pipe } = renderToPipeableStream(
    <SsrApp environment={environment} queryRef={queryRef} mode={mode} />,
    {
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("content-type", "text/html; charset=utf-8");
        injector.write(head);
        pipe(injector);
      },
      onShellError(error) {
        res.statusCode = 500;
        injector.end(`<pre>${String(error)}</pre>`);
      },
      onError(error) {
        console.error("[ssr]", error);
      },
    },
  );
}
