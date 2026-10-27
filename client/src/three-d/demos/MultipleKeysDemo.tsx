import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { ProductPageView } from "./ProductPageView.js";
import type { Demo } from "./types.js";
import MultipleKeysDemoQueryNode, {
  type MultipleKeysDemoQuery,
} from "./__generated__/MultipleKeysDemoQuery.graphql.js";

function View({ queryRef }: { queryRef: PreloadedQuery<MultipleKeysDemoQuery> }) {
  const data = usePreloadedQuery<MultipleKeysDemoQuery>(
    graphql`
      query MultipleKeysDemoQuery($slug: String!) {
        productPage(slug: $slug) {
          ...ProductPageView_page
        }
      }
    `,
    queryRef,
  );
  return data.productPage ? <ProductPageView page={data.productPage} /> : <p>Not found.</p>;
}

export const multipleKeysDemo: Demo<MultipleKeysDemoQuery> = {
  id: "full-page",
  title: "Full page: several 3D fields with @match(key:)",
  slug: "espresso-machine",
  query: MultipleKeysDemoQueryNode,
  View,
  explainer: (
    <p>
      Blocks, price strategy and energy label in one fragment. Open the store inspector: the
      ProductPage's children carry <code>__module_component_ProductPageView_page_price</code>,{" "}
      <code>…_energyLabel</code> and <code>…_ProductPageView_page</code> (the default key is the
      document name).
    </p>
  ),
};
