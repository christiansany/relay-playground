// @ts-check
const path = require("node:path");

const config = /** @type {const} */ ({
  src: path.resolve(__dirname, "./src"),
  language: "typescript",
  schema: path.resolve(__dirname, "../server/schema.graphql"),
  excludes: [
    "**/node_modules/**",
    "**/__generated__/**",
    "**/dist/**",
    "**/.yarn/**",
  ],
  eagerEsModules: true,
  noFutureProofEnums: true,
  typescriptExcludeUndefinedFromNullableUnion: true,
});

module.exports = config;
