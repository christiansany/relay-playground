import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { Server3DTextBlock_block$key } from "./__generated__/Server3DTextBlock_block.graphql.js";

export default function Server3DTextBlock({ block }: { block: Server3DTextBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment Server3DTextBlock_block on TextBlock {
        heading
        body
      }
    `,
    block,
  );
  useMountLog("Server3DTextBlock");
  return (
    <section className="block">
      <h4>{data.heading}</h4>
      <p>{data.body}</p>
    </section>
  );
}
