import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * `RELAY_UPSTREAM=1 vitest` runs the suite against the Relay build copied
 * into `node_modules/.relay-upstream` by `scripts/link-upstream-relay.mjs`
 * (e.g. facebook/relay main) instead of the published npm packages.
 */
const upstreamRoot = resolve(__dirname, "node_modules/.relay-upstream/node_modules");
const useUpstream = process.env.RELAY_UPSTREAM === "1";
if (useUpstream && !existsSync(upstreamRoot)) {
  throw new Error(
    "RELAY_UPSTREAM=1 but no upstream build linked; run `yarn test:upstream:link` first.",
  );
}

// The server code imported by the tests and `@graphql-tools/*` must share one
// `graphql` instance. Vite would pick the ESM build for the former while Node
// loads the CJS build for the latter, so pin both to the CJS entry.
const graphqlEntry = createRequire(resolve(__dirname, "../server/package.json")).resolve("graphql");

export default defineConfig({
  plugins: [react({ babel: { plugins: ["relay"] } })],
  resolve: {
    alias: [
      { find: /^graphql$/, replacement: graphqlEntry },
      ...(useUpstream
        ? [
            { find: /^relay-runtime$/, replacement: `${upstreamRoot}/relay-runtime/index.js` },
            { find: /^react-relay$/, replacement: `${upstreamRoot}/react-relay/index.js` },
          ]
        : []),
    ],
  },
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "node",
  },
});
