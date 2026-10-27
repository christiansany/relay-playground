import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { Server3DVideoBlock_block$key } from "./__generated__/Server3DVideoBlock_block.graphql.js";

export default function Server3DVideoBlock({ block }: { block: Server3DVideoBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment Server3DVideoBlock_block on VideoBlock {
        title
        videoUrl
      }
    `,
    block,
  );
  useMountLog("Server3DVideoBlock");
  return (
    <section className="block">
      <h4>🎬 {data.title} (player A)</h4>
      <code>{data.videoUrl}</code>
    </section>
  );
}
