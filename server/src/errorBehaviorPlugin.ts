import type { ApolloServerPlugin } from "@apollo/server";
import { GraphQLError } from "graphql";
import {
  executeWithErrorBehavior,
  parseErrorBehavior,
  type ErrorBehaviorSchemas,
} from "./errorBehavior.js";

/** Lets Apollo Sandbox (which can't add body fields) pick a behavior. */
const ON_ERROR_HEADER = "x-graphql-on-error";

/**
 * Takes over execution for every operation so the request's `onError`
 * (body property per the proposal, or the `x-graphql-on-error` header) is
 * honored. Apollo still does parsing, validation and HTTP handling.
 */
export function errorBehaviorPlugin(schemas: ErrorBehaviorSchemas): ApolloServerPlugin {
  return {
    async requestDidStart() {
      return {
        async responseForOperation(requestContext) {
          const http = requestContext.request.http;
          const body = http?.body as { onError?: unknown } | undefined;
          const onError = parseErrorBehavior(body?.onError ?? http?.headers.get(ON_ERROR_HEADER));
          if (onError instanceof GraphQLError) {
            return {
              http: requestContext.response.http,
              body: { kind: "single", singleResult: { errors: [onError.toJSON()] } },
            };
          }
          const result = await executeWithErrorBehavior({
            schemas,
            document: requestContext.document,
            variableValues: requestContext.request.variables,
            operationName: requestContext.operationName,
            contextValue: requestContext.contextValue as Record<string, unknown>,
            onError,
          });
          requestContext.response.http.headers.set("x-graphql-error-behavior", onError);
          return {
            http: requestContext.response.http,
            body: { kind: "single", singleResult: result },
          };
        },
      };
    },
  };
}
