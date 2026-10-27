import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../../runtime/useMountLog.js";
import type { SaleBadgeView_badge$key } from "./__generated__/SaleBadgeView_badge.graphql.js";

export default function SaleBadgeView({ badge }: { badge: SaleBadgeView_badge$key }) {
  const data = useFragment(
    graphql`
      fragment SaleBadgeView_badge on SaleBadge {
        discountLabel
      }
    `,
    badge,
  );
  useMountLog("SaleBadgeView");
  return (
    <span className="block" style={{ color: "#c00" }}>
      🏷 {data.discountLabel}
    </span>
  );
}
