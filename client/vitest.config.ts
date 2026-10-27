import { defineConfig } from "vitest/config";

// Runtime-level tests for the 3D lab. They import compiled Relay artifacts
// directly (no graphql`` tags), so they need neither babel-plugin-relay nor
// a running server.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/__tests__/**/*.test.ts"],
  },
});
