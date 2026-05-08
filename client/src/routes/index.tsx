import { createFileRoute, Link } from '@tanstack/react-router';
import { graphql, useLazyLoadQuery } from 'react-relay';
import type { routesIndexQuery as IndexQueryType } from './__generated__/routesIndexQuery.graphql.js';

export const Route = createFileRoute('/')({
  component: IndexPage,
});

const IndexQuery = graphql`
  query routesIndexQuery {
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
`;

function IndexPage() {
  const data = useLazyLoadQuery<IndexQueryType>(IndexQuery, {});

  return (
    <main>
      <h1>Sectors</h1>
      <ul>
        {data.sectors.edges.map((edge) => (
          <li key={edge.node.id}>
            <Link to="/sectors/$slug" params={{ slug: edge.node.slug }}>
              {edge.node.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
