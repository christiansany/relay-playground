import { createFileRoute, Link } from '@tanstack/react-router';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { SlugSectorQuery as SectorBySlugQuery } from './__generated__/SlugSectorQuery.graphql.js';

export const Route = createFileRoute('/sectors/$slug')({
  component: SectorPage,
});

const SectorQuery = graphql`
  query SlugSectorQuery($slug: String!) {
    sectorBySlug(slug: $slug) {
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
`;

function SectorPage() {
  const { slug } = Route.useParams();
  const data = useLazyLoadQuery<SectorBySlugQuery>(SectorQuery, { slug });

  if (!data.sectorBySlug) {
    return (
      <main>
        <p>Sector "{slug}" not found.</p>
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
      <h2 style={{ fontSize: '1rem', color: '#666' }}>Product types</h2>
      <ul>
        {productTypes.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link
              to="/product-types/$slug"
              params={{ slug: edge.node.slug }}
            >
              {edge.node.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
