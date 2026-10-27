#!/usr/bin/env node
// Copies a local facebook/relay build (relay-runtime + react-relay `dist/`)
// into node_modules/.relay-upstream so `yarn test:upstream` can run the
// suite against unreleased Relay. Copy, not symlink: Node resolves symlinked
// packages from their real path, which would pick up the relay repo's own
// `react` instead of ours.
//
// Usage: node scripts/link-upstream-relay.mjs [path/to/relay]   (default: ../../relay)
// The relay checkout must be built: `yarn install` there runs `gulp dist`.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const clientRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const relayRoot = resolve(
  process.argv[2] ?? process.env.RELAY_REPO ?? resolve(clientRoot, "../../relay"),
);
const target = resolve(clientRoot, "node_modules/.relay-upstream/node_modules");

for (const pkg of ["relay-runtime", "react-relay"]) {
  if (!existsSync(resolve(relayRoot, "dist", pkg, "index.js"))) {
    console.error(
      `No build at ${relayRoot}/dist/${pkg}. Run \`yarn install\` (or \`yarn build\`) in ${relayRoot}.`,
    );
    process.exit(1);
  }
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
for (const pkg of ["relay-runtime", "react-relay"]) {
  cpSync(resolve(relayRoot, "dist", pkg), resolve(target, pkg), { recursive: true });
}

let revision = "unknown";
try {
  revision = execFileSync("git", ["-C", relayRoot, "log", "-1", "--format=%h %s (%cs)"])
    .toString()
    .trim();
} catch {}
console.log(`Linked relay-runtime + react-relay from ${relayRoot}\n  at ${revision}`);
