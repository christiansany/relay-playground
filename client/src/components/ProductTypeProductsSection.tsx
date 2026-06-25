import { graphql, usePaginationFragment } from "react-relay";
import type { ProductTypeProductsSection_productType$key } from "./__generated__/ProductTypeProductsSection_productType.graphql.js";
import type { ProductTypeProductsSectionPaginationQuery } from "./__generated__/ProductTypeProductsSectionPaginationQuery.graphql.js";

type Props = {
  productTypeRef: ProductTypeProductsSection_productType$key;
};

export function ProductTypeProductsSection({ productTypeRef }: Props) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    ProductTypeProductsSectionPaginationQuery,
    ProductTypeProductsSection_productType$key
  >(
    graphql`
      fragment ProductTypeProductsSection_productType on ProductType
      @catch
      @argumentDefinitions(first: { type: "Int", defaultValue: 20 }, after: { type: "String" })
      @refetchable(queryName: "ProductTypeProductsSectionPaginationQuery") {
        products(first: $first, after: $after)
          @connection(key: "ProductTypeProductsSection_productType_products") {
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
      <h2>Products</h2>
      <p>
        Debug: hasNext -&gt; {hasNext.toString()}, isLoadingNext -&gt; {isLoadingNext.toString()}
      </p>
      <ul>
        {data.ok &&
          data.value.products.edges.map((edge) => (
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
