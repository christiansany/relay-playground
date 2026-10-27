import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { SpecsBlock_block$key } from "./__generated__/SpecsBlock_block.graphql.js";

export default function SpecsBlock({ block }: { block: SpecsBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment SpecsBlock_block on SpecsBlock {
        specs {
          label
          value
        }
      }
    `,
    block,
  );
  useMountLog("SpecsBlock");
  return (
    <section className="block">
      <table>
        <tbody>
          {data.specs.map((s) => (
            <tr key={s.label}>
              <th style={{ textAlign: "left", paddingRight: 12 }}>{s.label}</th>
              <td>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
