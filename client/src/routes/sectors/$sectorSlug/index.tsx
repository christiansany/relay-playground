import { createFileRoute, Link } from "@tanstack/react-router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ErrorBoundary } from "../../../components/ErrorBoundary.js";
import { SectorProductTypesSection } from "../../../components/SectorProductTypesSection.js";
import { SectorProductsSection } from "../../../components/SectorProductsSection.js";
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
          ...SectorProductTypesSection_sector
          ...SectorProductsSection_sector
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

  return (
    <main>
      <p>
        <Link to="/">← Sectors</Link>
      </p>
      <h1>{data.sectorBySlug.name}</h1>
      <ErrorBoundary fallback={<p>Error in SectorProductTypesSection</p>}>
        <SectorProductTypesSection sectorRef={data.sectorBySlug} />
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Error in SectorProductsSection</p>}>
        <SectorProductsSection sectorRef={data.sectorBySlug} />
      </ErrorBoundary>
    </main>
  );
}
