import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applySimulateErrorDirective } from "./directives/simulateError.js";
import { resolvers } from "./resolvers.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const typeDefs = readFileSync(resolve(__dirname, "../schema.graphql"), "utf-8");

const baseSchema = makeExecutableSchema({ typeDefs, resolvers });

export const schema = applySimulateErrorDirective(baseSchema);
