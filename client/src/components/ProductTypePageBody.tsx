import { graphql, usePaginationFragment } from "react-relay";
import type { ProductTypePageBody_productType$key } from "./__generated__/ProductTypePageBody_productType.graphql.js";
import type { ProductTypePageBodyPaginationQuery } from "./__generated__/ProductTypePageBodyPaginationQuery.graphql.js";

type Props = {
  productTypeRef: ProductTypePageBody_productType$key;
};

export function ProductTypePageBody({ productTypeRef }: Props) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ProductTypePageBodyPaginationQuery,
    ProductTypePageBody_productType$key
  >(
    graphql`
      fragment ProductTypePageBody_productType on ProductType
      @throwOnFieldError
      @argumentDefinitions(first: { type: "Int", defaultValue: 20 }, after: { type: "String" })
      @refetchable(queryName: "ProductTypePageBodyPaginationQuery") {
        products(first: $first, after: $after)
          @connection(key: "ProductTypePageBody_productType_products") {
          edges {
            node {
              id
              name
              description
              price
            }
          }
        }
      }
    `,
    productTypeRef,
  );

  return (
    <section>
      <ul>
        {data.products.edges.map((edge) => (
          <li key={edge.node.id} style={{ marginBlock: "0.5rem" }}>
            <strong>{edge.node.name}</strong> — {edge.node.description}{" "}
            <span style={{ color: "#888" }}>(CHF {edge.node.price.toFixed(2)})</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!hasNext || isLoadingNext}
        onClick={() => loadNext(20)}
        style={{ marginTop: "1rem" }}
      >
        {isLoadingNext ? "Loading…" : hasNext ? "Load more" : "No more"}
      </button>
    </section>
  );
}
