import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../../runtime/useMountLog.js";
import type { NewBadgeView_badge$key } from "./__generated__/NewBadgeView_badge.graphql.js";

export default function NewBadgeView({ badge }: { badge: NewBadgeView_badge$key }) {
  const data = useFragment(
    graphql`
      fragment NewBadgeView_badge on NewBadge {
        since
      }
    `,
    badge,
  );
  useMountLog("NewBadgeView");
  return (
    <span className="block" style={{ color: "#080" }}>
      ✨ {data.since}
    </span>
  );
}
