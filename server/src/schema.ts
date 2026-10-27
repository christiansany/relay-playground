import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applySimulateErrorDirective } from "./directives/simulateError.js";
import { createErrorBehaviorSchemas } from "./errorBehavior.js";
import { resolvers } from "./resolvers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const typeDefs = readFileSync(resolve(__dirname, "../schema.graphql"), "utf-8");

const baseSchema = makeExecutableSchema({ typeDefs, resolvers });

/** One schema per error behavior, see `errorBehavior.ts`. */
export const schemas = createErrorBehaviorSchemas(applySimulateErrorDirective(baseSchema));

export const schema = schemas.strict;
