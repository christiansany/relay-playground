import { useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import Server3DVideoBlockFragment, {
  type Server3DVideoBlock_block$key,
} from "./__generated__/Server3DVideoBlock_block.graphql.js";

/**
 * Variant B. The server answers `js(module: "Server3DVideoBlock")` with
 * `"Server3DVideoBlockB"` when the request carries `x-3d-variant: b`. The
 * fragment (data shape) stays the same. Only the component changes, with no
 * query change and no client deploy needed to switch.
 */
export default function Server3DVideoBlockB({ block }: { block: Server3DVideoBlock_block$key }) {
  const data = useFragment(Server3DVideoBlockFragment, block);
  useMountLog("Server3DVideoBlockB");
  return (
    <section className="block" style={{ outline: "2px dashed #c0c" }}>
      <h4>▶️ {data.title} (player B, chosen by the server)</h4>
      <video src={data.videoUrl} width={240} controls />
    </section>
  );
}
