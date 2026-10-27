import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { Server3DSpecsBlock_block$key } from "./__generated__/Server3DSpecsBlock_block.graphql.js";

export default function Server3DSpecsBlock({ block }: { block: Server3DSpecsBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment Server3DSpecsBlock_block on SpecsBlock {
        specs {
          label
          value
        }
      }
    `,
    block,
  );
  useMountLog("Server3DSpecsBlock");
  return (
    <ul className="block">
      {data.specs.map((s) => (
        <li key={s.label}>
          {s.label}: {s.value}
        </li>
      ))}
    </ul>
  );
}
