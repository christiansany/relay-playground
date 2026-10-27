// Minimal, framework-agnostic SSR server for the 3D page. It runs Vite in
// middleware mode: Vite transforms the TSX for Node (ssrLoadModule) and
// serves the browser modules. Usage:
//
//   yarn workspace client ssr                      # http://localhost:5174
//   SSR_PORT=5184 VITE_GRAPHQL_ENDPOINT=http://localhost:4100/graphql yarn workspace client ssr
//
// Pick a mode on the index page; every mode renders the same product page.
// Extra query params: `links=0` (no modulepreload links), `chunkDelay=300`
// (simulated CDN latency for 3D chunks in the browser).
import { existsSync } from "node:fs";
import { createServer as createHttpServer } from "node:http";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.SSR_PORT ?? 5174);

const vite = await createViteServer({
  root,
  server: { middlewareMode: true, hmr: { port: port + 10000 } },
  appType: "custom",
});

const template = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Relay 3D SSR</title>
    <style>
      body { font-family: system-ui, sans-serif; padding: 1rem 2rem; }
      .fallback { color: #999; font-style: italic; }
      .block { display: block; margin: 6px 0; }
      #panel { position: fixed; right: 0; top: 0; width: 46%; height: 100%; overflow: auto; background: #f7f7f7; font-size: 12px; padding: 0 12px; border-left: 1px solid #ddd; }
      #root { width: 50%; }
    </style>
  </head>
  <body>
    <nav>__NAV__</nav>
    <div id="root"><!--app--></div>
    <script type="module" src="/src/three-d/ssr/entry-client.tsx"></script>
  </body>
</html>`;

const modes = [
  "replay",
  "replay-no-preload",
  "snapshot-naive",
  "snapshot-revived",
  "server3d-snapshot",
  "server3d-snapshot-no-preload",
  "csr",
];
const slugs = ["espresso-machine", "noise-cancelling-headphones", "paper-notebook"];

/** Dev-only: module id (`/src/...` without extension) → URL Vite serves. */
function resolveUrl(id) {
  if (!id.startsWith("/src/")) return null; // Server 3D names need a manifest
  for (const ext of [".tsx", ".ts", ".js"]) {
    if (existsSync(resolve(root, `.${id}${ext}`))) return `${id}${ext}`;
  }
  return null;
}

createHttpServer((req, res) => {
  vite.middlewares(req, res, async () => {
    try {
      const url = new URL(req.url ?? "/", `http://localhost:${port}`);
      if (url.pathname !== "/") {
        res.statusCode = 404;
        res.end("not found");
        return;
      }
      const mode = url.searchParams.get("mode") ?? "replay";
      const slug = url.searchParams.get("slug") ?? "noise-cancelling-headphones";
      // `links=0`: don't emit <link rel=modulepreload> (isolates the effect).
      const emitPreloadLinks = url.searchParams.get("links") !== "0";
      if (!modes.includes(mode)) throw new Error(`unknown mode ${mode}`);
      // Keep the lab knobs (links, chunkDelay) when switching mode/product.
      const extra = [...url.searchParams]
        .filter(([k]) => k !== "mode" && k !== "slug")
        .map(([k, v]) => `&${k}=${v}`)
        .join("");
      const nav = modes
        .map((m) => {
          const label = m === mode ? `<b>${m}</b>` : m;
          return `<a href="/?mode=${m}&slug=${slug}${extra}">${label}</a>`;
        })
        .join(" · ");
      const slugNav = slugs
        .map((s) => `<a href="/?mode=${mode}&slug=${s}${extra}">${s}</a>`)
        .join(" · ");
      const html = await vite.transformIndexHtml(
        req.url ?? "/",
        template.replace("__NAV__", `${nav}<br/>product: ${slugNav}`),
      );
      const [head, tail] = html.split("<!--app-->");
      const { render } = await vite.ssrLoadModule("/src/three-d/ssr/entry-server.tsx");
      render({
        slug,
        mode,
        res,
        head,
        tail,
        resolveUrl: emitPreloadLinks ? resolveUrl : () => null,
      });
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      res.statusCode = 500;
      res.end(String(error?.stack ?? error));
    }
  });
}).listen(port, () => console.log(`3D SSR harness on http://localhost:${port}`));
