import { graphql, useFragment } from "react-relay";
import type { NestedCatchNullRepro_query$key } from "./__generated__/NestedCatchNullRepro_query.graphql.js";

type Props = {
  queryRef: NestedCatchNullRepro_query$key;
};

export function NestedCatchNullRepro({ queryRef }: Props) {
  const data = useFragment(
    graphql`
      fragment NestedCatchNullRepro_query on Query @catch(to: NULL) {
        sectors(first: 1) @catch(to: NULL) {
          edges {
            node {
              id
              name @simulateError
            }
          }
        }
      }
    `,
    queryRef,
  );

  // The BUG: the error lives inside the inner @catch's scope (node.name), yet the
  // outer @catch nulled the entire fragment payload instead of just data.sectors.
  if (data == null) {
    return (
      <section>
        <h3>@catch(to: NULL)</h3>
        <p>
          ❌ OUTER caught (whole fragment === null) — BUG: expected only the inner field nulled.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h3>@catch(to: NULL)</h3>
      {data.sectors == null ? (
        <p>✅ INNER caught (data.sectors === null) — the EXPECTED outcome.</p>
      ) : (
        <p>✅ No error surfaced — sectors loaded.</p>
      )}
    </section>
  );
}
