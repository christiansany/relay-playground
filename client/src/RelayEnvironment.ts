import {
  Environment,
  Network,
  RecordSource,
  ROOT_TYPE,
  Store,
  type FetchFunction,
} from "relay-runtime";

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

const fetchFn: FetchFunction = async (request, variables) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: request.text, variables }),
  });

  const json = await response.json();

  return json;
};

export const RelayEnvironment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
  missingFieldHandlers: [
    {
      handle(field, record, argValues) {
        if (
          record != null &&
          record.getType() === ROOT_TYPE &&
          (field.name === "node" || field.name.endsWith("ById")) &&
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
