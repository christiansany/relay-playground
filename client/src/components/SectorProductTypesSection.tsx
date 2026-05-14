import { Link } from "@tanstack/react-router";
import { graphql, useFragment } from "react-relay";
import type { SectorProductTypesSection_sector$key } from "./__generated__/SectorProductTypesSection_sector.graphql.js";

type Props = {
  sectorRef: SectorProductTypesSection_sector$key;
};

export function SectorProductTypesSection({ sectorRef }: Props) {
  const data = useFragment(
    graphql`
      fragment SectorProductTypesSection_sector on Sector @throwOnFieldError {
        slug
        productTypes(first: 50) {
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
    sectorRef,
  );

  return (
    <section>
      <h2>Product types</h2>
      <ul>
        {data.productTypes.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link
              to="/sectors/$sectorSlug/$productTypeSlug"
              params={{
                sectorSlug: data.slug,
                productTypeSlug: edge.node.slug,
              }}
            >
              {edge.node.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
