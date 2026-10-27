import { Suspense } from "react";
import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { Match3D } from "../runtime/Match3D.js";
import type { Demo } from "./types.js";
import MatchStrategyDemoQueryNode, {
  type MatchStrategyDemoQuery,
} from "./__generated__/MatchStrategyDemoQuery.graphql.js";

function View({ queryRef }: { queryRef: PreloadedQuery<MatchStrategyDemoQuery> }) {
  const data = usePreloadedQuery<MatchStrategyDemoQuery>(
    graphql`
      query MatchStrategyDemoQuery($slug: String!) {
        productPage(slug: $slug) {
          title
          # @match on a field with a "supported: [String]" argument: the
          # compiler adds supported: ["RegularPrice","SalePrice","BundlePrice"]
          # (the concrete types of the @module spreads) and the server
          # picks the best strategy from that list.
          full: priceDisplay @match {
            __typename
            ...RegularPrice_price @module(name: "../prices/RegularPrice")
            ...SalePrice_price @module(name: "../prices/SalePrice")
            ...BundlePrice_price @module(name: "../prices/BundlePrice")
          }
          # An "older client" that can only render RegularPrice: the
          # compiler sends supported: ["RegularPrice"] and the server falls
          # back. Two @match fields in one document need distinct keys.
          basic: priceDisplay @match(key: "MatchStrategyDemoQuery_basic") {
            __typename
            ...RegularPrice_price @module(name: "../prices/RegularPrice")
          }
        }
      }
    `,
    queryRef,
  );
  const page = data.productPage;
  if (page == null) return <p>Not found.</p>;
  return (
    <article>
      <h3>{page.title}</h3>
      <p>
        full client ({page.full?.__typename}):{" "}
        <Suspense fallback={<span className="fallback">loading…</span>}>
          <Match3D match={page.full} />
        </Suspense>
      </p>
      <p>
        basic client ({page.basic?.__typename}):{" "}
        <Suspense fallback={<span className="fallback">loading…</span>}>
          <Match3D match={page.basic} />
        </Suspense>
      </p>
    </article>
  );
}

export const matchStrategyDemo: Demo<MatchStrategyDemoQuery> = {
  id: "match",
  title: "@match: server-negotiated rendering strategy",
  slug: "espresso-machine",
  query: MatchStrategyDemoQueryNode,
  View,
  explainer: (
    <p>
      Look at the query text in the inspector. Each <code>priceDisplay</code> selection carries a
      compiler-generated <code>supported</code> list. The espresso machine prefers{" "}
      <code>SalePrice</code>, the headphones <code>BundlePrice</code>. The "basic" client only
      supports <code>RegularPrice</code>, so the server falls back. Both fields can return different
      types for the same product because the <code>supported</code> argument is part of the storage
      key.
    </p>
  ),
};
