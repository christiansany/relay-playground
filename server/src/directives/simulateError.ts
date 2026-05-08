import { getDirective, mapSchema, MapperKind } from "@graphql-tools/utils";
import { GraphQLError, type GraphQLSchema } from "graphql";

/**
 * Transforms a schema so any field tagged with `@simulateError` (FIELD_DEFINITION)
 * gets a resolver that always throws a GraphQL field error. The original
 * resolver is never invoked.
 *
 * Apollo Server / graphql-js handles the rest: the error is recorded against
 * the field's path in the `errors` array, and the field nulls — bubbling up
 * to the nearest nullable parent (or staying at the field itself when paired
 * with `@semanticNonNull`).
 */
export function applySimulateErrorDirective(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, "simulateError")?.[0];
      if (!directive) return fieldConfig;

      return {
        ...fieldConfig,
        resolve: () => {
          throw new GraphQLError("Simulated error via @simulateError directive");
        },
      };
    },
  });
}
