import { graphql, useLazyLoadQuery } from 'react-relay';
import { ProductTypeRow } from './components/ProductTypeRow.js';
import type { AppQuery as AppQueryType } from './__generated__/AppQuery.graphql.js';

const AppQuery = graphql`
  query AppQuery {
    productTypes(first: 10) {
      edges {
        node {
          id
          ...ProductTypeRow_productType
        }
      }
    }
  }
`;

export function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {});

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <h1>Relay Playground</h1>
      {data.productTypes.edges.map((edge) => (
        <ProductTypeRow key={edge.node.id} productTypeRef={edge.node} />
      ))}
    </main>
  );
}
