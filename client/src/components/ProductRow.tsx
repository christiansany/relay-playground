import { graphql, useFragment } from 'react-relay';
import type { ProductRow_product$key } from './__generated__/ProductRow_product.graphql.js';

const ProductFragment = graphql`
  fragment ProductRow_product on Product {
    id
    name
    description
    price
    productType {
      id
      name
    }
  }
`;

type Props = {
  productRef: ProductRow_product$key;
};

export function ProductRow({ productRef }: Props) {
  const product = useFragment(ProductFragment, productRef);

  return (
    <li style={{ marginBlock: '0.5rem' }}>
      <strong>{product.name}</strong> — {product.description}{' '}
      <span style={{ color: '#888' }}>
        (CHF {product.price.toFixed(2)} · {product.productType.name})
      </span>
    </li>
  );
}
