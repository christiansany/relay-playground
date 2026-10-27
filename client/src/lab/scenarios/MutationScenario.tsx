import { useState, useTransition } from "react";
import { ConnectionHandler } from "relay-runtime";
import {
  graphql,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
  type PreloadedQuery,
} from "react-relay";
import { Card, Json, Note, Pending, RecordID, Row, Value, View } from "../components/ui.js";
import type { MutationScenarioCreateMutation } from "./__generated__/MutationScenarioCreateMutation.graphql.js";
import type { MutationScenarioDeleteMutation } from "./__generated__/MutationScenarioDeleteMutation.graphql.js";
import type { MutationScenarioQuery } from "./__generated__/MutationScenarioQuery.graphql.js";
import type { MutationScenarioRenameMutation } from "./__generated__/MutationScenarioRenameMutation.graphql.js";

const PT1 = btoa("ProductType:pt_1");
const CONNECTION_ID = ConnectionHandler.getConnectionID(PT1, "MutationScenario_products");

const ListQuery = graphql`
  query MutationScenarioQuery($id: ID!) {
    productTypeById(id: $id) {
      name
      products(first: 3) @connection(key: "MutationScenario_products") {
        edges {
          node {
            __id
            id
            name
          }
        }
      }
    }
  }
`;

function ProductList({ queryRef }: { queryRef: PreloadedQuery<MutationScenarioQuery> }) {
  const data = usePreloadedQuery<MutationScenarioQuery>(ListQuery, queryRef);
  return (
    <ol start={0} style={{ margin: 0, paddingLeft: 24 }}>
      {data.productTypeById?.products?.edges?.map((edge, i) => (
        <li key={i}>
          {edge?.node == null ? (
            <>
              node: <Value value={null} />
            </>
          ) : (
            <>
              {edge.node.name} <RecordID dataID={edge.node.__id} /> id:{" "}
              <Value value={edge.node.id} />
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

export function MutationScenario() {
  const [listRef, loadList] = useQueryLoader<MutationScenarioQuery>(ListQuery);
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState(true);
  const [optimistic, setOptimistic] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const report = {
    onCompleted: (data: unknown, errors: unknown) => setResult({ onCompleted: { data, errors } }),
    onError: (error: Error) => setResult({ onError: error.message }),
  };

  const [rename] = useMutation<MutationScenarioRenameMutation>(graphql`
    mutation MutationScenarioRenameMutation($input: RenameProductInput!, $err: Boolean!) {
      renameProduct(input: $input) {
        product {
          id @simulateError(if: $err)
          name
        }
      }
    }
  `);
  const [create] = useMutation<MutationScenarioCreateMutation>(graphql`
    mutation MutationScenarioCreateMutation(
      $input: CreateProductInput!
      $connections: [ID!]!
      $err: Boolean!
    ) {
      createProduct(input: $input) {
        productEdge @appendEdge(connections: $connections) {
          cursor
          node {
            id @simulateError(if: $err)
            name
          }
        }
      }
    }
  `);
  const [remove] = useMutation<MutationScenarioDeleteMutation>(graphql`
    mutation MutationScenarioDeleteMutation(
      $input: DeleteProductInput!
      $connections: [ID!]!
      $err: Boolean!
    ) {
      deleteProduct(input: $input) {
        # Separate selections: with both directives on one field the
        # compiler silently keeps only the first handle.
        deletedProductId @deleteEdge(connections: $connections) @simulateError(if: $err)
        deletedId: deletedProductId @deleteRecord @simulateError(if: $err)
      }
    }
  `);

  const firstProductId = btoa("Product:p_1");
  const now = () => new Date().toLocaleTimeString();

  return (
    <Card title="4 · Mutations whose payload id errors">
      <Note>
        In every mode the server has already applied the mutation when the error is raised.{" "}
        <b>PROPAGATE</b>: the payload object is null, nothing lands in the store;{" "}
        <code>@appendEdge</code> skips the null node. <b>NULL</b>: <code>onCompleted</code> gets the
        data with <code>id: null</code>; it is written to a per-commit client record (
        <code>client:local:N:…</code>), not to the entity, so a rename doesn't show and an appended
        edge points at a copy. <b>HALT</b>: <code>onError</code>. With an optimistic response, the
        optimistic value is rolled back in all three modes. Deletes never happen on the client.
      </Note>
      <Row>
        <button
          onClick={() =>
            startTransition(() => loadList({ id: PT1 }, { fetchPolicy: "store-or-network" }))
          }
        >
          Load list
        </button>
        <label>
          <input type="checkbox" checked={err} onChange={(e) => setErr(e.target.checked)} /> id
          error in payload
        </label>
        <label>
          <input
            type="checkbox"
            checked={optimistic}
            onChange={(e) => setOptimistic(e.target.checked)}
          />{" "}
          optimistic
        </label>
        <Pending show={isPending} />
      </Row>
      <Row style={{ marginTop: 8 }}>
        <button
          onClick={() => {
            const name = `Renamed ${now()}`;
            rename({
              variables: { input: { id: firstProductId, name }, err },
              optimisticResponse: optimistic
                ? {
                    renameProduct: {
                      product: { id: firstProductId, name: `${name} (optimistic)` },
                    },
                  }
                : undefined,
              ...report,
            });
          }}
        >
          Rename item 0
        </button>
        <button
          onClick={() =>
            create({
              variables: {
                input: { productTypeId: PT1, name: `Created ${now()}`, price: 9.99 },
                connections: [CONNECTION_ID],
                err,
              },
              ...report,
            })
          }
        >
          Create (@appendEdge)
        </button>
        <button
          onClick={() =>
            remove({
              variables: { input: { id: firstProductId }, connections: [CONNECTION_ID], err },
              ...report,
            })
          }
        >
          Delete item 0 (@deleteEdge + @deleteRecord)
        </button>
      </Row>
      <Row style={{ marginTop: 8, alignItems: "stretch" }}>
        <View label="Beverages — products(first: 3) @connection">
          {listRef ? <ProductList queryRef={listRef} /> : <em>not loaded</em>}
        </View>
      </Row>
      {result != null && <Json value={result} maxHeight={200} />}
    </Card>
  );
}
