import { mapSchema, MapperKind } from "@graphql-tools/utils";
import {
  defaultFieldResolver,
  getDirectiveValues,
  GraphQLError,
  type GraphQLResolveInfo,
  type GraphQLSchema,
} from "graphql";
import { toGlobalId } from "graphql-relay";

const DIRECTIVE_NAME = "simulateError";
const ERROR_MESSAGE = "Simulated error via @simulateError directive";

type SimulateErrorArgs = {
  if?: boolean;
  onlyForIds?: readonly string[] | null;
  message?: string | null;
};

/**
 * Global id of the object a field is resolved on. Mock records carry
 * `__typename` + local `id`; connection edges carry `node`.
 */
function globalIdOf(source: unknown): string | null {
  if (source == null || typeof source !== "object") return null;
  const record = source as { __typename?: unknown; id?: unknown; node?: unknown };
  if (typeof record.__typename === "string" && typeof record.id === "string") {
    return toGlobalId(record.__typename, record.id);
  }
  if (record.node != null) return globalIdOf(record.node);
  return null;
}

function simulatedError(source: unknown, info: GraphQLResolveInfo): GraphQLError | null {
  const directive = info.schema.getDirective(DIRECTIVE_NAME);
  if (directive == null) return null;
  for (const node of info.fieldNodes) {
    const args = getDirectiveValues(directive, node, info.variableValues) as
      | SimulateErrorArgs
      | undefined;
    if (args == null || args.if === false) continue;
    if (args.onlyForIds != null) {
      const id = globalIdOf(source);
      if (id == null || !args.onlyForIds.includes(id)) continue;
    }
    return new GraphQLError(args.message ?? ERROR_MESSAGE, {
      extensions: { code: "SIMULATED_ERROR" },
    });
  }
  return null;
}

/**
 * Wires up `@simulateError` (FIELD-only): every field gets a wrapped resolver
 * that inspects `info.fieldNodes[*].directives` at execution time and throws
 * when any selection that contributed to this field carries the directive
 * (respecting its `if` / `onlyForIds` arguments). The thrown `GraphQLError`
 * is recorded against the field's path in the response's `errors` array.
 * What happens next depends on the request's error behavior (see
 * `errorBehavior.ts`): with `PROPAGATE` it bubbles to the nearest nullable
 * parent, with `NULL` it stays at the field, with `HALT` it aborts the
 * whole response.
 */
export function applySimulateErrorDirective(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const originalResolver = fieldConfig.resolve ?? defaultFieldResolver;
      return {
        ...fieldConfig,
        resolve: (source, args, context, info) => {
          const error = simulatedError(source, info);
          if (error != null) {
            throw error;
          }
          return originalResolver(source, args, context, info);
        },
      };
    },
  });
}
