import { Suspense } from "react";
import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { Match3D } from "../runtime/Match3D.js";
import type { Demo } from "./types.js";
import UnionBlocksDemoQueryNode, {
  type UnionBlocksDemoQuery,
} from "./__generated__/UnionBlocksDemoQuery.graphql.js";

function View({ queryRef }: { queryRef: PreloadedQuery<UnionBlocksDemoQuery> }) {
  const data = usePreloadedQuery<UnionBlocksDemoQuery>(
    graphql`
      query UnionBlocksDemoQuery($slug: String!) {
        productPage(slug: $slug) {
          title
          blocks {
            __typename
            # One @module spread per concrete type. The server only sees
            # "... on TextBlock { ...TextBlock_block }" and so on. The
            # @module name is a path relative to *this file*. The compiler
            # rewrites it relative to the generated artifact.
            ...TextBlock_block @module(name: "../blocks/TextBlock")
            ...ImageGalleryBlock_block @module(name: "../blocks/ImageGalleryBlock")
            ...VideoBlock_block @module(name: "../blocks/VideoBlock")
            ...SpecsBlock_block @module(name: "../blocks/SpecsBlock")
            ...ReviewHighlightBlock_block @module(name: "../blocks/ReviewHighlightBlock")
            ...CarouselBlock_block @module(name: "../blocks/CarouselBlock")
            # ComparisonBlock is deliberately not listed: MatchContainer
            # renders its fallback for it.
          }
        }
      }
    `,
    queryRef,
  );
  if (data.productPage == null) return <p>Not found.</p>;
  return (
    <article>
      <h3>{data.productPage.title}</h3>
      {data.productPage.blocks.map((block, i) => (
        // One boundary per block: blocks pop in as their chunk arrives
        // instead of the whole list waiting for the slowest one.
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

export const unionBlocksDemo: Demo<UnionBlocksDemoQuery> = {
  id: "union",
  title: "@module on a union list",
  slug: "espresso-machine",
  query: UnionBlocksDemoQueryNode,
  View,
  explainer: (
    <>
      <p>
        Canonical use case: a list of heterogeneous blocks. Only the chunks for the block types that
        are actually on the page get downloaded. Switch to <code>paper-notebook</code> and only{" "}
        <code>TextBlock</code> is fetched. Switch to <code>noise-cancelling-headphones</code> for
        nested 3D (carousel) and an unknown type (ComparisonBlock → fallback).
      </p>
    </>
  ),
};
