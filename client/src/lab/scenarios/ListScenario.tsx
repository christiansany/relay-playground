import { useState, useTransition } from "react";
import {
  graphql,
  useFragment,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
  type PreloadedQuery,
} from "react-relay";
import { Card, Note, Pending, RecordID, Row, Value, View } from "../components/ui.js";
import type { ListScenarioDetail_sector$key } from "./__generated__/ListScenarioDetail_sector.graphql.js";
import type { ListScenarioOrderMutation } from "./__generated__/ListScenarioOrderMutation.graphql.js";
import type { ListScenarioQuery } from "./__generated__/ListScenarioQuery.graphql.js";

/** Technology (default index 1) and Workspace (index 1 once reversed). */
const ERROR_IDS = [btoa("Sector:sec_2"), btoa("Sector:sec_9")];

const SectorsQuery = graphql`
  query ListScenarioQuery($errIds: [ID!]!) {
    sectors(first: 5) {
      edges {
        node {
          __id
          id @simulateError(onlyForIds: $errIds)
          name
          ...ListScenarioDetail_sector
        }
      }
    }
  }
`;

function SectorList({
  queryRef,
  onSelect,
}: {
  queryRef: PreloadedQuery<ListScenarioQuery>;
  onSelect: (ref: ListScenarioDetail_sector$key, label: string) => void;
}) {
  const data = usePreloadedQuery<ListScenarioQuery>(SectorsQuery, queryRef);
  return (
    <ol start={0} style={{ margin: 0, paddingLeft: 24 }}>
      {data.sectors?.edges?.map((edge, i) =>
        edge?.node == null ? (
          <li key={i}>
            node: <Value value={null} />
          </li>
        ) : (
          <li key={edge.node.__id}>
            <button onClick={() => onSelect(edge.node!, edge.node!.name ?? "?")}>open</button>{" "}
            {edge.node.name} <RecordID dataID={edge.node.__id} />
          </li>
        ),
      )}
    </ol>
  );
}

function SectorDetail({ sector }: { sector: ListScenarioDetail_sector$key }) {
  const data = useFragment(
    graphql`
      fragment ListScenarioDetail_sector on Sector {
        __id
        id
        name
        slug
      }
    `,
    sector,
  );
  return (
    <div>
      <div>
        reads record <RecordID dataID={data.__id} />
      </div>
      <div>
        id: <Value value={data.id} />
      </div>
      <div>
        name: <b>{data.name}</b>
      </div>
      <div>slug: {data.slug}</div>
    </div>
  );
}

export function ListScenario() {
  const [listRef, loadList] = useQueryLoader<ListScenarioQuery>(SectorsQuery);
  const [isPending, startTransition] = useTransition();
  const fetchList = (err: boolean) =>
    startTransition(() =>
      loadList({ errIds: err ? ERROR_IDS : [] }, { fetchPolicy: "network-only" }),
    );
  const [selected, setSelected] = useState<{
    ref: ListScenarioDetail_sector$key;
    label: string;
  } | null>(null);
  const [commitOrder] = useMutation<ListScenarioOrderMutation>(graphql`
    mutation ListScenarioOrderMutation($order: LabListOrder!) {
      labSetSectorOrder(order: $order)
    }
  `);

  return (
    <Card title="2 · List items without ids: positional client records">
      <Note>
        When a list item's <code>id</code> is null, Relay stores it under{" "}
        <code>client:root:sectors(first:5):edges:1:node</code>, an id that means "whatever is at
        index 1". Steps (with <b>NULL</b>): fetch with id errors, open "Technology" (index 1),
        reverse the order on the server, fetch again. The detail panel still holds the same ref and
        now shows <b>Workspace</b>. Under <b>PROPAGATE</b> the errored rows are just null.
      </Note>
      <Row>
        <button onClick={() => fetchList(true)}>Fetch list (id errors on 2 sectors)</button>
        <button onClick={() => fetchList(false)}>Fetch list (clean)</button>
        <button onClick={() => commitOrder({ variables: { order: "REVERSED" } })}>
          Reverse order on server
        </button>
        <button onClick={() => commitOrder({ variables: { order: "DEFAULT" } })}>
          Default order
        </button>
        <Pending show={isPending} />
      </Row>
      <Row style={{ marginTop: 8, alignItems: "stretch" }}>
        <View label="List — sectors(first: 5)">
          {listRef ? (
            <SectorList queryRef={listRef} onSelect={(ref, label) => setSelected({ ref, label })} />
          ) : (
            <em>not fetched</em>
          )}
        </View>
        <View label={selected ? `Detail panel (opened from "${selected.label}")` : "Detail panel"}>
          {selected ? <SectorDetail sector={selected.ref} /> : <em>open a row</em>}
        </View>
      </Row>
    </Card>
  );
}
