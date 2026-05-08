import { createFileRoute, Link } from "@tanstack/react-router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ProductTypePageBody } from "../../../components/ProductTypePageBody.js";
import type { ProductTypeSlugQuery as ProductTypeSlugQueryType } from "./__generated__/ProductTypeSlugQuery.graphql.js";
import { ErrorBoundary } from "../../../components/ErrorBoundary.js";

export const Route = createFileRoute("/sectors/$sectorSlug/$productTypeSlug")({
  component: NestedProductTypePage,
});

function NestedProductTypePage() {
  const { sectorSlug, productTypeSlug } = Route.useParams();
  const data = useLazyLoadQuery<ProductTypeSlugQueryType>(
    graphql`
      query ProductTypeSlugQuery($sectorSlug: String!, $productTypeSlug: String!)
      @throwOnFieldError {
        sectorBySlug(slug: $sectorSlug) {
          id
          name
          slug
        }
        productTypeBySlug(slug: $productTypeSlug) {
          id
          name
          ...ProductTypePageBody_productType
        }
      }
    `,
    { sectorSlug, productTypeSlug },
  );

  if (!data.productTypeBySlug) {
    return (
      <main>
        <p>Product type "{productTypeSlug}" not found.</p>
        <Link to="/">← Back to sectors</Link>
      </main>
    );
  }

  const sector = data.sectorBySlug;

  return (
    <main>
      <p>
        <Link to="/">Sectors</Link>
        {" / "}
        {sector ? (
          <Link to="/sectors/$sectorSlug" params={{ sectorSlug: sector.slug }}>
            {sector.name}
          </Link>
        ) : (
          <span>{sectorSlug}</span>
        )}
        {" / "}
        <span>{data.productTypeBySlug.name}</span>
      </p>
      <h1>{data.productTypeBySlug.name}</h1>

      <ErrorBoundary fallback={<p>Error in ProductTypePageBody</p>}>
        <ProductTypePageBody productTypeRef={data.productTypeBySlug} />
      </ErrorBoundary>
    </main>
  );
}
