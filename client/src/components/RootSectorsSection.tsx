import { Link } from "@tanstack/react-router";
import { graphql, useFragment } from "react-relay";
import type { RootSectorsSection_query$key } from "./__generated__/RootSectorsSection_query.graphql.js";

type Props = {
  queryRef: RootSectorsSection_query$key;
};

export function RootSectorsSection({ queryRef }: Props) {
  const data = useFragment(
    graphql`
      fragment RootSectorsSection_query on Query @throwOnFieldError {
        sectors(first: 50) {
          edges {
            node {
              id
              slug
              name
            }
          }
        }
      }
    `,
    queryRef,
  );

  return (
    <section>
      <h2>All sectors</h2>
      <ul>
        {data.sectors.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link to="/sectors/$sectorSlug" params={{ sectorSlug: edge.node.slug }}>
              {edge.node.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
