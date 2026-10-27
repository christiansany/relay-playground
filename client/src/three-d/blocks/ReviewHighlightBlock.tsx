import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { ReviewHighlightBlock_block$key } from "./__generated__/ReviewHighlightBlock_block.graphql.js";

export default function ReviewHighlightBlock({ block }: { block: ReviewHighlightBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment ReviewHighlightBlock_block on ReviewHighlightBlock {
        rating
        quote
        author
      }
    `,
    block,
  );
  useMountLog("ReviewHighlightBlock");
  return (
    <blockquote className="block">
      {"★".repeat(Math.round(data.rating))} “{data.quote}” — {data.author}
    </blockquote>
  );
}
