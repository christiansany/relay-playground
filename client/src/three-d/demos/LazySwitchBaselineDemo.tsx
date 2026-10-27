import { lazy, Suspense, type ComponentType } from "react";
import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import type { Demo } from "./types.js";
import LazySwitchBaselineDemoQueryNode, {
  type LazySwitchBaselineDemoQuery,
} from "./__generated__/LazySwitchBaselineDemoQuery.graphql.js";

/**
 * Baseline without 3D: plain fragment spreads plus `React.lazy` and a
 * switch on `__typename`. The components are code-split just as well. The
 * difference is in the query artifact: its normalization AST contains
 * every block type's selections (compare the artifact sizes in the docs).
 * Nothing is negotiated with the server, and the server can't choose modules.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyBlock = ComponentType<{ block: any }>;
const components: Record<string, AnyBlock> = {
  TextBlock: lazy(() => import("../blocks/TextBlock.js")),
  ImageGalleryBlock: lazy(() => import("../blocks/ImageGalleryBlock.js")),
  VideoBlock: lazy(() => import("../blocks/VideoBlock.js")),
  SpecsBlock: lazy(() => import("../blocks/SpecsBlock.js")),
  ReviewHighlightBlock: lazy(() => import("../blocks/ReviewHighlightBlock.js")),
};

function View({ queryRef }: { queryRef: PreloadedQuery<LazySwitchBaselineDemoQuery> }) {
  const data = usePreloadedQuery<LazySwitchBaselineDemoQuery>(
    graphql`
      query LazySwitchBaselineDemoQuery($slug: String!) {
        productPage(slug: $slug) {
          title
          blocks {
            __typename
            # Relay 21 requires @alias for a spread whose type might not
            # match (abstract parent). @module spreads are exempt from that
            # rule, because MatchContainer handles the "didn't match" case.
            ...TextBlock_block @alias
            ...ImageGalleryBlock_block @alias
            ...VideoBlock_block @alias
            ...SpecsBlock_block @alias
            ...ReviewHighlightBlock_block @alias
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
      {page.blocks.map((block, i) => {
        const Component = components[block.__typename];
        // With @alias, each fragment ref is a nullable property named after
        // the fragment.
        const ref = (block as Record<string, unknown>)[`${block.__typename}_block`];
        return Component && ref ? (
          <Suspense key={i} fallback={<p className="fallback">loading {block.__typename}…</p>}>
            <Component block={ref} />
          </Suspense>
        ) : (
          <p key={i} className="fallback">
            no component for {block.__typename}
          </p>
        );
      })}
    </article>
  );
}

export const lazySwitchBaselineDemo: Demo<LazySwitchBaselineDemoQuery> = {
  id: "baseline",
  title: "Baseline: React.lazy + __typename switch (no 3D)",
  slug: "espresso-machine",
  query: LazySwitchBaselineDemoQueryNode,
  View,
  explainer: (
    <p>
      For comparison. The component chunks are just as code-split, and the waterfall is the same
      (data → chunk). What's different: no <code>$normalization</code> chunks (all block selections
      are inlined into the query artifact), no <code>operationLoader</code>, and no store-hydration
      edge cases. Data for all block types is still only returned for blocks that exist.
    </p>
  ),
};
