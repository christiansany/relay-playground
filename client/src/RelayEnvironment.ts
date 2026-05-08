import {
  Environment,
  Network,
  RecordSource,
  Store,
  type FetchFunction,
  type GraphQLSingularResponse,
} from "relay-runtime";
import {
  parseSimulateErrorDirectives,
  simulateFieldErrors,
  stripSimulateErrorDirectives,
  type SimulateErrorField,
} from "./relay/simulateErrorDirective.js";

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

const fetchFn: FetchFunction = async (request, variables) => {
  if (!request.text) {
    throw new Error("Relay request text is missing");
  }

  let query = request.text;
  let simulateErrorFields: SimulateErrorField[] = [];

  // Dev-only: detect @simulateError, strip the directive before sending,
  // remember which fields to null in the response.
  if (import.meta.env.DEV && query.includes("@simulateError")) {
    simulateErrorFields = parseSimulateErrorDirectives(query);
    if (simulateErrorFields.length > 0) {
      query = stripSimulateErrorDirectives(query);
    }
  }

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  let json = (await response.json()) as GraphQLSingularResponse;

  if (simulateErrorFields.length > 0) {
    json = simulateFieldErrors(json, simulateErrorFields);
    console.log(
      `[Relay] Simulated ${simulateErrorFields.length} error(s) for ${
        request.name ?? "(anonymous)"
      }`,
    );
  }

  return json;
};

export const RelayEnvironment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});
