import { useState, useTransition } from "react";
import {
  graphql,
  usePaginationFragment,
  usePreloadedQuery,
  useQueryLoader,
  type PreloadedQuery,
} from "react-relay";
import { Card, Note, Pending, RecordID, Row, View } from "../components/ui.js";
import type { PaginationScenarioQuery } from "./__generated__/PaginationScenarioQuery.graphql.js";
import type { PaginationScenario_products$key } from "./__generated__/PaginationScenario_products.graphql.js";
import type { PaginationScenario_throwingProducts$key } from "./__generated__/PaginationScenario_throwingProducts.graphql.js";

const PageQuery = graphql`
  query PaginationScenarioQuery($err: Boolean!) {
    productTypeBySlug(slug: "beverages") {
      __id
      id @simulateError(if: $err)
      name
      ...PaginationScenario_products
      ...PaginationScenario_throwingProducts
    }
  }
`;

function Page({ queryRef }: { queryRef: PreloadedQuery<PaginationScenarioQuery> }) {
  const data = usePreloadedQuery<PaginationScenarioQuery>(PageQuery, queryRef);
  const productType = data.productTypeBySlug;
  if (productType == null) return <p>productTypeBySlug: null</p>;
  return (
    <>
      <div>
        {productType.name} — reads record <RecordID dataID={productType.__id} />
      </div>
      <Row style={{ marginTop: 8, alignItems: "stretch" }}>
        <View label="@refetchable pagination fragment">
          <Products productType={productType} />
        </View>
        <View label="same, with @throwOnFieldError (repo convention)">
          <ThrowingProducts productType={productType} />
        </View>
      </Row>
    </>
  );
}

function Products({ productType }: { productType: PaginationScenario_products$key }) {
  const [loadError, setLoadError] = useState<string | null>(null);
  const { data, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment PaginationScenario_products on ProductType
      @refetchable(queryName: "PaginationScenarioProductsPaginationQuery")
      @argumentDefinitions(first: { type: "Int", defaultValue: 3 }, after: { type: "String" }) {
        products(first: $first, after: $after) @connection(key: "PaginationScenario_products") {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    productType,
  );
  return (
    <>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {data.products?.edges?.map((e, i) => (
          <li key={e?.node?.id ?? i}>{e?.node?.name}</li>
        ))}
      </ul>
      <button
        disabled={isLoadingNext}
        onClick={() => loadNext(3, { onComplete: (e) => setLoadError(e ? e.message : "ok") })}
      >
        loadNext(3)
      </button>
      {loadError != null && <div style={{ fontSize: 12 }}>loadNext: {loadError}</div>}
    </>
  );
}

function ThrowingProducts({
  productType,
}: {
  productType: PaginationScenario_throwingProducts$key;
}) {
  const { data } = usePaginationFragment(
    graphql`
      fragment PaginationScenario_throwingProducts on ProductType
      @throwOnFieldError
      @refetchable(queryName: "PaginationScenarioThrowingProductsPaginationQuery")
      @argumentDefinitions(first: { type: "Int", defaultValue: 3 }, after: { type: "String" }) {
        products(first: $first, after: $after)
          @connection(key: "PaginationScenarioThrowing_products") {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
    productType,
  );
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {data.products.edges.map((e) => (
        <li key={e.node.name}>{e.node.name}</li>
      ))}
    </ul>
  );
}

export function PaginationScenario() {
  const [pageRef, loadPage] = useQueryLoader<PaginationScenarioQuery>(PageQuery);
  const [isPending, startTransition] = useTransition();
  const fetchPage = (err: boolean) =>
    startTransition(() => loadPage({ err }, { fetchPolicy: "network-only" }));
  return (
    <Card title="3 · Pagination / refetch on an entity whose id errored">
      <Note>
        <code>@refetchable</code> needs the entity's id to build its follow-up query, so the
        compiler adds <code>id</code> to the fragment's reader selection. Under <b>NULL</b>: with{" "}
        <code>@throwOnFieldError</code> the fragment throws on render even though the component
        never asks for <code>id</code>; without it, the list renders but <code>loadNext()</code>{" "}
        sends <code>id: null</code> and the server rejects the request. Under <b>PROPAGATE</b> the
        whole product type is null.
      </Note>
      <Row>
        <button onClick={() => fetchPage(false)}>Fetch (clean)</button>
        <button onClick={() => fetchPage(true)}>Fetch (id error on product type)</button>
        <Pending show={isPending} />
      </Row>
      <div style={{ marginTop: 8 }}>
        <View label="Product type page — productTypeBySlug(slug)">
          {pageRef ? <Page queryRef={pageRef} /> : <em>not fetched</em>}
        </View>
      </div>
    </Card>
  );
}
