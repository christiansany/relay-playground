import { Suspense } from "react";
import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { Match3D } from "../runtime/Match3D.js";
import "./registry.js";
import type { Server3DSsrPageQuery } from "./__generated__/Server3DSsrPageQuery.graphql.js";

export { default as Server3DSsrPageQueryNode } from "./__generated__/Server3DSsrPageQuery.graphql.js";

/** Server-3D page for the SSR harness: the store holds string references. */
export function Server3DSsrPage({ queryRef }: { queryRef: PreloadedQuery<Server3DSsrPageQuery> }) {
  const data = usePreloadedQuery<Server3DSsrPageQuery>(
    graphql`
      query Server3DSsrPageQuery($slug: String!) {
        productPage(slug: $slug) {
          title
          blocks {
            __typename
            ...Server3DTextBlock_block @module(name: "Server3DTextBlock")
            ...Server3DVideoBlock_block @module(name: "Server3DVideoBlock")
            ...Server3DSpecsBlock_block @module(name: "Server3DSpecsBlock")
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
      {page.blocks.map((block, i) => (
        <Suspense key={i} fallback={<p className="fallback">loading {block.__typename}…</p>}>
          <Match3D
            match={block}
            fallback={<p className="fallback">no @module for {block.__typename}</p>}
          />
        </Suspense>
      ))}
    </article>
  );
}
