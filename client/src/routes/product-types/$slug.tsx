import { createFileRoute, Link } from "@tanstack/react-router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ProductTypePageBody } from "../../components/ProductTypePageBody.js";
import type { SlugProductTypeQuery as ProductTypeBySlugQuery } from "./__generated__/SlugProductTypeQuery.graphql.js";

export const Route = createFileRoute("/product-types/$slug")({
  component: ProductTypePage,
});

function ProductTypePage() {
  const { slug } = Route.useParams();
  const data = useLazyLoadQuery<ProductTypeBySlugQuery>(
    graphql`
      query SlugProductTypeQuery($slug: String!) @throwOnFieldError {
        productTypeBySlug(slug: $slug) {
          id
          name
          ...ProductTypePageBody_productType
        }
      }
    `,
    { slug },
  );

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
      <ProductTypePageBody productTypeRef={data.productTypeBySlug} />
    </main>
  );
}
