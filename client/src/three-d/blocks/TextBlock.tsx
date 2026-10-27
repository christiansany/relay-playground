import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { TextBlock_block$key } from "./__generated__/TextBlock_block.graphql.js";

// Loaded via `@module(name: "../blocks/TextBlock")`. Must be the module's
// default export, and the prop must be named after the fragment's suffix
// (`TextBlock_block` -> `block`): MatchContainer passes it that way.
export default function TextBlock({ block }: { block: TextBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment TextBlock_block on TextBlock {
        heading
        body
      }
    `,
    block,
  );
  useMountLog("TextBlock");
  return (
    <section className="block">
      <h4>{data.heading}</h4>
      <p>{data.body}</p>
    </section>
  );
}
