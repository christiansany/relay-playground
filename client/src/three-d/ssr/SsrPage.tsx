import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { ProductPageView } from "../demos/ProductPageView.js";
import type { SsrPageQuery } from "./__generated__/SsrPageQuery.graphql.js";

export { default as SsrPageQueryNode } from "./__generated__/SsrPageQuery.graphql.js";

/** Compiler-3D page used by the SSR harness (blocks + price + energy label). */
export function SsrPage({ queryRef }: { queryRef: PreloadedQuery<SsrPageQuery> }) {
  const data = usePreloadedQuery<SsrPageQuery>(
    graphql`
      query SsrPageQuery($slug: String!) {
        productPage(slug: $slug) {
          ...ProductPageView_page
        }
      }
    `,
    queryRef,
  );
  return data.productPage ? <ProductPageView page={data.productPage} /> : <p>Not found.</p>;
}
