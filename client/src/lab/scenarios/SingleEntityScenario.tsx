import { useState, useTransition } from "react";
import {
  graphql,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
  type PreloadedQuery,
} from "react-relay";
import { Card, Json, Note, Pending, RecordID, Row, Value, View } from "../components/ui.js";
import type { SingleEntityScenarioNodeQuery } from "./__generated__/SingleEntityScenarioNodeQuery.graphql.js";
import type { SingleEntityScenarioProductQuery } from "./__generated__/SingleEntityScenarioProductQuery.graphql.js";
import type { SingleEntityScenarioRenameMutation } from "./__generated__/SingleEntityScenarioRenameMutation.graphql.js";

const P1 = btoa("Product:p_1");

const ProductQuery = graphql`
  query SingleEntityScenarioProductQuery($id: ID!, $err: Boolean!) {
    productById(id: $id) {
      __id
      id @simulateError(if: $err)
      name
    }
  }
`;

const NodeQuery = graphql`
  query SingleEntityScenarioNodeQuery($id: ID!) {
    node(id: $id) {
      __id
      id
      ... on Product {
        name
      }
    }
  }
`;

function ProductPage({ queryRef }: { queryRef: PreloadedQuery<SingleEntityScenarioProductQuery> }) {
  const data = usePreloadedQuery<SingleEntityScenarioProductQuery>(ProductQuery, queryRef);
  const product = data.productById;
  if (product == null)
    return (
      <p>
        productById: <Value value={null} />
      </p>
    );
  return (
    <div>
      <div>
        reads record <RecordID dataID={product.__id} />
      </div>
      <div>
        id: <Value value={product.id} />
      </div>
      <div>name: {product.name}</div>
    </div>
  );
}

function ElsewhereView({ queryRef }: { queryRef: PreloadedQuery<SingleEntityScenarioNodeQuery> }) {
  const data = usePreloadedQuery<SingleEntityScenarioNodeQuery>(NodeQuery, queryRef);
  return (
    <div>
      <div>
        reads record <RecordID dataID={data.node?.__id} />
      </div>
      <div>name: {data.node?.name}</div>
    </div>
  );
}

export function SingleEntityScenario() {
  const [pageRef, loadPage] = useQueryLoader<SingleEntityScenarioProductQuery>(ProductQuery);
  const [elsewhereRef, loadElsewhere] = useQueryLoader<SingleEntityScenarioNodeQuery>(NodeQuery);
  const [isPending, startTransition] = useTransition();
  const fetchPage = (err: boolean) =>
    startTransition(() => loadPage({ id: P1, err }, { fetchPolicy: "network-only" }));
  const [renameResult, setRenameResult] = useState<unknown>(null);
  const [commitRename, renaming] = useMutation<SingleEntityScenarioRenameMutation>(graphql`
    mutation SingleEntityScenarioRenameMutation($input: RenameProductInput!) {
      renameProduct(input: $input) {
        product {
          id
          name
        }
      }
    }
  `);

  return (
    <Card title="1 · One entity, its id errors">
      <Note>
        The product page fetches <code>productById(id)</code>. Fetch it cleanly, then with an error
        on <code>id</code>. <b>PROPAGATE</b>: <code>productById</code> becomes null. <b>NULL</b>:
        the page switches to a client record (<code>client:root:productById(…)</code>) holding a
        copy of the data; the real record is untouched, so a rename made elsewhere no longer reaches
        the page. <b>HALT</b>: the request fails, the page keeps the last good data (or hits the
        boundary).
      </Note>
      <Row>
        <button onClick={() => fetchPage(false)}>Fetch page (clean)</button>
        <button onClick={() => fetchPage(true)}>Fetch page (id error)</button>
        <button
          onClick={() =>
            startTransition(() => loadElsewhere({ id: P1 }, { fetchPolicy: "network-only" }))
          }
        >
          Load "elsewhere" view
        </button>
        <button
          disabled={renaming}
          onClick={() =>
            commitRename({
              variables: { input: { id: P1, name: `Renamed ${new Date().toLocaleTimeString()}` } },
              onCompleted: (data, errors) => setRenameResult({ data, errors }),
              onError: (error) => setRenameResult({ error: error.message }),
            })
          }
        >
          Rename product (clean)
        </button>
        <Pending show={isPending} />
      </Row>
      <Row style={{ marginTop: 8, alignItems: "stretch" }}>
        <View label="Product page — productById(id)">
          {pageRef ? <ProductPage queryRef={pageRef} /> : <em>not fetched</em>}
        </View>
        <View label="Same product elsewhere — node(id)">
          {elsewhereRef ? <ElsewhereView queryRef={elsewhereRef} /> : <em>not loaded</em>}
        </View>
      </Row>
      {renameResult != null && <Json value={renameResult} maxHeight={120} />}
    </Card>
  );
}
