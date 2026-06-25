import { graphql, useFragment } from "react-relay";
import type { NestedCatchResultRepro_query$key } from "./__generated__/NestedCatchResultRepro_query.graphql.js";

type Props = {
  queryRef: NestedCatchResultRepro_query$key;
};

export function NestedCatchResultRepro({ queryRef }: Props) {
  const data = useFragment(
    graphql`
      fragment NestedCatchResultRepro_query on Query @catch(to: RESULT) {
        sectors(first: 1) @catch(to: RESULT) {
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
  // whole fragment's outer @catch is what caught it.
  if (!data.ok) {
    return (
      <section>
        <h3>@catch(to: RESULT)</h3>
        <p>❌ OUTER caught (data.ok === false) — BUG: expected the inner catch.</p>
      </section>
    );
  }

  const { sectors } = data.value;

  return (
    <section>
      <h3>@catch(to: RESULT)</h3>
      {sectors.ok ? (
        <p>✅ No error surfaced — sectors loaded.</p>
      ) : (
        <p>✅ INNER caught (sectors.ok === false) — the EXPECTED outcome.</p>
      )}
    </section>
  );
}
