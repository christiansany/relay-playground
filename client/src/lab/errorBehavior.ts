import { Observable, type FetchFunction, type GraphQLResponse } from "relay-runtime";

/**
 * Client half of the `onError` proposal
 * (https://github.com/graphql/graphql-spec/pull/1163). Relay itself has no
 * notion of `onError` yet; it is just one more property in the request body,
 * so the fetch function is the place to send it.
 */
export const ERROR_BEHAVIORS = ["PROPAGATE", "NULL", "HALT"] as const;
export type ErrorBehavior = (typeof ERROR_BEHAVIORS)[number];

export type GraphQLRequestBody = {
  query: string;
  variables: Record<string, unknown>;
  operationName: string;
  onError: ErrorBehavior;
};

/** Sends a request body somewhere and resolves with the JSON response. */
export type GraphQLTransport = (body: GraphQLRequestBody, signal: AbortSignal) => Promise<unknown>;

export function httpTransport(endpoint: string): GraphQLTransport {
  return (body, signal) =>
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    }).then((response) => response.json());
}

export type NetworkExchange = {
  readonly operationName: string;
  readonly operationKind: string;
  readonly variables: Record<string, unknown>;
  readonly onError: ErrorBehavior;
  /** What the server sent. */
  readonly response: GraphQLResponse;
  /** What Relay received, if `transformResponse` changed it. */
  readonly relayReceived: GraphQLResponse;
};

export type CreateFetchFnOptions = {
  readonly transport: GraphQLTransport;
  /** Read at request time, so the behavior can be switched at runtime. */
  readonly getOnError: () => ErrorBehavior;
  /** Hook to rewrite a response before Relay normalizes it (see `idErrorGuards.ts`). */
  readonly getTransformResponse?: () => ((response: GraphQLResponse) => GraphQLResponse) | null;
  readonly onExchange?: (exchange: NetworkExchange) => void;
};

export function createFetchFn({
  transport,
  getOnError,
  getTransformResponse,
  onExchange,
}: CreateFetchFnOptions): FetchFunction {
  return (request, variables) =>
    Observable.create((sink) => {
      const controller = new AbortController();
      const onError = getOnError();
      const body: GraphQLRequestBody = {
        query: request.text ?? "",
        variables,
        operationName: request.name,
        onError,
      };
      transport(body, controller.signal)
        .then((json) => {
          const response = json as GraphQLResponse;
          const transform = getTransformResponse?.() ?? null;
          const relayReceived = transform != null ? transform(response) : response;
          onExchange?.({
            operationName: request.name,
            operationKind: request.operationKind,
            variables,
            onError,
            response,
            relayReceived,
          });
          sink.next(relayReceived);
          sink.complete();
        })
        .catch((err: unknown) => {
          if (!sink.closed) sink.error(err as Error);
        });
      return () => controller.abort();
    });
}
