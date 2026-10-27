import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { EnergyLabelBadge_label$key } from "./__generated__/EnergyLabelBadge_label.graphql.js";

const colors: Record<string, string> = { A: "#0a0", B: "#5b0", C: "#bb0", D: "#e90" };

/** The "usually null" use case: most products have no energy label. */
export default function EnergyLabelBadge({ label }: { label: EnergyLabelBadge_label$key }) {
  const data = useFragment(
    graphql`
      fragment EnergyLabelBadge_label on EnergyLabel {
        grade
        kwhPerYear
      }
    `,
    label,
  );
  useMountLog("EnergyLabelBadge");
  return (
    <span
      className="block"
      style={{ background: colors[data.grade] ?? "#e30", color: "white", padding: "2px 8px" }}
    >
      Energy {data.grade} · {data.kwhPerYear} kWh/yr
    </span>
  );
}
