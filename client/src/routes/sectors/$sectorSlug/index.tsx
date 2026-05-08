import { createFileRoute, Link } from "@tanstack/react-router";
import { graphql, useLazyLoadQuery } from "react-relay";
import type { SectorSlugQuery as SectorSlugQueryType } from "./__generated__/SectorSlugQuery.graphql.js";

export const Route = createFileRoute("/sectors/$sectorSlug/")({
  component: SectorPage,
});

function SectorPage() {
  const { sectorSlug } = Route.useParams();
  const data = useLazyLoadQuery<SectorSlugQueryType>(
    graphql`
      query SectorSlugQuery($sectorSlug: String!) @throwOnFieldError {
        sectorBySlug(slug: $sectorSlug) {
          id
          name
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
      }
    `,
    { sectorSlug },
  );

  if (!data.sectorBySlug) {
    return (
      <main>
        <p>Sector "{sectorSlug}" not found.</p>
        <Link to="/">← Back to sectors</Link>
      </main>
    );
  }

  const { name, productTypes } = data.sectorBySlug;

  return (
    <main>
      <p>
        <Link to="/">← Sectors</Link>
      </p>
      <h1>{name}</h1>
      <h2 style={{ fontSize: "1rem", color: "#666" }}>Product types</h2>
      <ul>
        {productTypes.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link
              to="/sectors/$sectorSlug/$productTypeSlug"
              params={{
                sectorSlug,
                productTypeSlug: edge.node.slug,
              }}
            >
              {edge.node.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
