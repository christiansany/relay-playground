import {
  Environment,
  Network,
  Observable,
  RecordSource,
  ROOT_TYPE,
  Store,
  type FetchFunction,
} from "relay-runtime";

const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

const fetchFn: FetchFunction = (request, variables) =>
  Observable.create((sink) => {
    const controller = new AbortController();

    fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: request.text, variables }),
      signal: controller.signal,
    })
      .then((response) => response.json())
      .then((json) => {
        sink.next(json);
        sink.complete();
      })
      .catch((err) => {
        if (!sink.closed) sink.error(err);
      });

    return () => controller.abort();
  });

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
