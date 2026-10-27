# relay-playground

A two-workspace TypeScript playground:

- **`server/`** — Apollo Server 4 exposing a small Relay-compliant schema (Node interface + cursor connections) backed by hardcoded mock data.
- **`client/`** — Vite + React + Relay frontend that consumes that schema.

## Prerequisites

- Node `>=24.11 <25`
- Yarn 4 (vendored at `.yarn/releases/yarn-4.14.1.cjs`; `corepack` will pick it up automatically)

## Install

```bash
yarn install
```

## Develop

Run server and client together:

```bash
yarn dev
```

- Apollo Sandbox: http://localhost:4000/graphql
- Vite dev server: http://localhost:5173

Run the Relay compiler (once, then in watch mode while editing components):

```bash
yarn relay         # one-shot
yarn relay:watch   # watch
```

## Data-Driven Dependencies (3D) lab

`/three-d` in the client is a CSR lab for `@module` / `@match`. `yarn workspace client ssr` starts the SSR/hydration harness on :5174. Read [`docs/data-driven-dependencies.md`](docs/data-driven-dependencies.md) first.

## Schema

`server/schema.graphql` is the single source of truth. The Relay compiler in `client/` reads it via the relative path in `client/relay.config.json`.
