import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
  ROOT_TYPE,
} from "relay-runtime";

const HTTP_ENDPOINT = "http://localhost:4000/graphql";

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(HTTP_ENDPOINT, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
      // <-- Additional headers like 'Authorization' would go here
    },
    body: JSON.stringify({
      query: request.text, // <-- The GraphQL document composed by Relay
      variables,
    }),
  });

  return await resp.json();
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
    missingFieldHandlers: [
      {
        handle(field, record, argValues) {
          if (
            record != null &&
            record.getType() === ROOT_TYPE &&
            field.name === "product" &&
            "id" in argValues
          ) {
            return argValues.id;
          }
          return undefined;
        },
        kind: "linked",
      },
    ],
  });
}

export let relayEnvironment: Environment | undefined;

export function initRelayEnvironment() {
  const environment = relayEnvironment ?? createRelayEnvironment();

  // For SSG and SSR always create a new Relay environment.
  if (typeof window === "undefined") {
    return environment;
  }

  // Create the Relay environment once in the client
  // and then reuse it.
  if (!relayEnvironment) {
    relayEnvironment = environment;
  }

  return relayEnvironment;
}
