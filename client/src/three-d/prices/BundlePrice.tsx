import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { BundlePrice_price$key } from "./__generated__/BundlePrice_price.graphql.js";

export default function BundlePrice({ price }: { price: BundlePrice_price$key }) {
  const data = useFragment(
    graphql`
      fragment BundlePrice_price on BundlePrice {
        amount
        bundleItems
      }
    `,
    price,
  );
  useMountLog("BundlePrice");
  return (
    <strong className="block">
      Bundle CHF {data.amount.toFixed(2)}: {data.bundleItems.join(" + ")}
    </strong>
  );
}
