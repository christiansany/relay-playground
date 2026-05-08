import {
  Environment,
  Network,
  RecordSource,
  Store,
  type FetchFunction,
} from 'relay-runtime';

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';

const fetchFn: FetchFunction = async (request, variables) => {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: request.text, variables }),
  });
  return await response.json();
};

export const RelayEnvironment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});
