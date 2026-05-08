import { getDirective, mapSchema, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, type GraphQLSchema } from "graphql";

const DIRECTIVE_NAME = "simulateError";
const ERROR_MESSAGE = "Simulated error via @simulateError directive";

/**
 * Wires up `@simulateError` for both directive locations:
 *
 * - FIELD_DEFINITION (schema-level): every read of the tagged schema field
 *   throws, regardless of the operation that selected it.
 * - FIELD (operation-level): every other field gets a wrapped resolver that
 *   inspects `info.fieldNodes[*].directives` at execution time and throws
 *   when it finds `@simulateError` on one of the selections that contributed
 *   to this field. Lets clients tag a single read in a query/fragment
 *   without touching the schema.
 *
 * Both paths emit the same `GraphQLError`, which graphql-js records against
 * the field's path in the response's `errors` array and bubbles up to the
 * nearest nullable parent (or stops at the field when the client opts into
 * error tolerance via `@semanticNonNull` + `@throwOnFieldError`).
 */
export function applySimulateErrorDirective(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // FIELD_DEFINITION: schema author opted the field into always-error mode.
      const onSchemaField = getDirective(schema, fieldConfig, DIRECTIVE_NAME)?.[0];
      if (onSchemaField) {
        return {
          ...fieldConfig,
          resolve: () => {
            throw new GraphQLError(ERROR_MESSAGE);
          },
        };
      }

      // FIELD: wrap every other resolver to peek at the operation AST at
      // execution time and throw when the selection carries the directive.
      const originalResolver = fieldConfig.resolve ?? defaultFieldResolver;
      return {
        ...fieldConfig,
        resolve: (source, args, context, info) => {
          const taggedInOperation = info.fieldNodes.some((node) =>
            node.directives?.some((d) => d.name.value === DIRECTIVE_NAME),
          );
          if (taggedInOperation) {
            throw new GraphQLError(ERROR_MESSAGE);
          }
          return originalResolver(source, args, context, info);
        },
      };
    },
  });
}
