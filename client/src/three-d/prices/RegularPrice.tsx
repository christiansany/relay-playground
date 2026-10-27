import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { RegularPrice_price$key } from "./__generated__/RegularPrice_price.graphql.js";

export default function RegularPrice({ price }: { price: RegularPrice_price$key }) {
  const data = useFragment(
    graphql`
      fragment RegularPrice_price on RegularPrice {
        amount
      }
    `,
    price,
  );
  useMountLog("RegularPrice");
  return <strong className="block">CHF {data.amount.toFixed(2)}</strong>;
}
