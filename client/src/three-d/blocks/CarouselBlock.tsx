import { Suspense } from "react";
import { graphql, useFragment } from "react-relay";
import { Match3D } from "../runtime/Match3D.js";
import { useMountLog } from "../runtime/useMountLog.js";
import type { CarouselBlock_block$key } from "./__generated__/CarouselBlock_block.graphql.js";

/**
 * Nested 3D. This component is loaded via `@module`, and its own fragment
 * uses `@module` again. Its items only get normalized after
 * `CarouselBlock_block$normalization` has loaded, so the waterfall is
 *
 *   query → [Carousel normalization ∥ Carousel component]
 *         → [item normalizations ∥ item components]
 *
 * The docs' "don't nest 3D" warning is about exactly this.
 */
export default function CarouselBlock({ block }: { block: CarouselBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment CarouselBlock_block on CarouselBlock {
        title
        items {
          __typename
          ...TextBlock_block @module(name: "./TextBlock")
          ...ImageGalleryBlock_block @module(name: "./ImageGalleryBlock")
          ...VideoBlock_block @module(name: "./VideoBlock")
          ...SpecsBlock_block @module(name: "./SpecsBlock")
          ...ReviewHighlightBlock_block @module(name: "./ReviewHighlightBlock")
        }
      }
    `,
    block,
  );
  useMountLog("CarouselBlock");
  return (
    <section className="block" style={{ borderLeft: "3px solid #88f", paddingLeft: 8 }}>
      <h4>{data.title}</h4>
      {data.items.map((item, i) => (
        <Suspense key={i} fallback={<p className="fallback">loading {item.__typename}…</p>}>
          <Match3D
            match={item}
            fallback={<p className="fallback">unsupported {item.__typename}</p>}
          />
        </Suspense>
      ))}
    </section>
  );
}
