import { createFileRoute, Link } from '@tanstack/react-router';
import {
  graphql,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import type { SlugProductTypeQuery as ProductTypeBySlugQuery } from './__generated__/SlugProductTypeQuery.graphql.js';
import type { SlugProductType_productType$key } from './__generated__/SlugProductType_productType.graphql.js';
import type { SlugProductTypePaginationQuery } from './__generated__/SlugProductTypePaginationQuery.graphql.js';

export const Route = createFileRoute('/product-types/$slug')({
  component: ProductTypePage,
});

const ProductTypeQuery = graphql`
  query SlugProductTypeQuery($slug: String!) {
    productTypeBySlug(slug: $slug) {
      id
      name
      ...SlugProductType_productType
    }
  }
`;

const ProductsFragment = graphql`
  fragment SlugProductType_productType on ProductType
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 20 }
    after: { type: "String" }
  )
  @refetchable(queryName: "SlugProductTypePaginationQuery") {
    products(first: $first, after: $after)
      @connection(key: "SlugProductType_productType_products") {
      edges {
        node {
          id
          name
          description
          price
        }
      }
    }
  }
`;

function ProductTypePage() {
  const { slug } = Route.useParams();
  const data = useLazyLoadQuery<ProductTypeBySlugQuery>(ProductTypeQuery, {
    slug,
  });

  if (!data.productTypeBySlug) {
    return (
      <main>
        <p>Product type "{slug}" not found.</p>
        <Link to="/">← Back to sectors</Link>
      </main>
    );
  }

  return (
    <main>
      <p>
        <Link to="/">← Sectors</Link>
      </p>
      <h1>{data.productTypeBySlug.name}</h1>
      <ProductList productTypeRef={data.productTypeBySlug} />
    </main>
  );
}

type ProductListProps = {
  productTypeRef: SlugProductType_productType$key;
};

function ProductList({ productTypeRef }: ProductListProps) {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment<
    SlugProductTypePaginationQuery,
    SlugProductType_productType$key
  >(ProductsFragment, productTypeRef);

  return (
    <section>
      <ul>
        {data.products.edges.map((edge) => (
          <li key={edge.node.id} style={{ marginBlock: '0.5rem' }}>
            <strong>{edge.node.name}</strong> — {edge.node.description}{' '}
            <span style={{ color: '#888' }}>
              (CHF {edge.node.price.toFixed(2)})
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        disabled={!hasNext || isLoadingNext}
        onClick={() => loadNext(20)}
        style={{ marginTop: '1rem' }}
      >
        {isLoadingNext ? 'Loading…' : hasNext ? 'Load more' : 'No more'}
      </button>
    </section>
  );
}
