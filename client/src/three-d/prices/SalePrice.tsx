import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { SalePrice_price$key } from "./__generated__/SalePrice_price.graphql.js";

export default function SalePrice({ price }: { price: SalePrice_price$key }) {
  const data = useFragment(
    graphql`
      fragment SalePrice_price on SalePrice {
        amount
        originalAmount
        endsAt
      }
    `,
    price,
  );
  useMountLog("SalePrice");
  return (
    <strong className="block" style={{ color: "#c00" }}>
      CHF {data.amount.toFixed(2)} <s>CHF {data.originalAmount.toFixed(2)}</s> (until {data.endsAt})
    </strong>
  );
}
