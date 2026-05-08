import { graphql, useFragment } from 'react-relay';
import { ProductRow } from './ProductRow.js';
import type { ProductTypeRow_productType$key } from './__generated__/ProductTypeRow_productType.graphql.js';

const ProductTypeFragment = graphql`
  fragment ProductTypeRow_productType on ProductType {
    id
    name
    products(first: 10) {
      edges {
        node {
          id
          ...ProductRow_product
        }
      }
    }
  }
`;

type Props = {
  productTypeRef: ProductTypeRow_productType$key;
};

export function ProductTypeRow({ productTypeRef }: Props) {
  const productType = useFragment(ProductTypeFragment, productTypeRef);

  return (
    <section style={{ marginBlock: '1.5rem' }}>
      <h2>{productType.name}</h2>
      <ul>
        {productType.products.edges.map((edge) => (
          <ProductRow key={edge.node.id} productRef={edge.node} />
        ))}
      </ul>
    </section>
  );
}
