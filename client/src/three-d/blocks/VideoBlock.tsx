import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { VideoBlock_block$key } from "./__generated__/VideoBlock_block.graphql.js";

export default function VideoBlock({ block }: { block: VideoBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment VideoBlock_block on VideoBlock {
        title
        videoUrl
        durationSeconds
      }
    `,
    block,
  );
  useMountLog("VideoBlock");
  return (
    <section className="block">
      <h4>🎬 {data.title}</h4>
      <code>
        {data.videoUrl} ({Math.floor(data.durationSeconds / 60)}:
        {String(data.durationSeconds % 60).padStart(2, "0")})
      </code>
    </section>
  );
}
