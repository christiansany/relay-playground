import { mapSchema, MapperKind } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, type GraphQLSchema } from "graphql";

const DIRECTIVE_NAME = "simulateError";
const ERROR_MESSAGE = "Simulated error via @simulateError directive";

/**
 * Wires up `@simulateError` (FIELD-only): every field gets a wrapped resolver
 * that inspects `info.fieldNodes[*].directives` at execution time and throws
 * when any selection that contributed to this field carries the directive.
 * The thrown `GraphQLError` is recorded against the field's path in the
 * response's `errors` array and bubbles up to the nearest nullable parent
 * (or stops at the field when the client opts into error tolerance via
 * `@semanticNonNull` + `@throwOnFieldError`).
 */
export function applySimulateErrorDirective(schema: GraphQLSchema): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
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
