import { createFileRoute } from "@tanstack/react-router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ErrorBoundary } from "../components/ErrorBoundary.js";
import { RootSectorsSection } from "../components/RootSectorsSection.js";
import type { routesIndexQuery as IndexQueryType } from "./__generated__/routesIndexQuery.graphql.js";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const data = useLazyLoadQuery<IndexQueryType>(
    graphql`
      query routesIndexQuery @throwOnFieldError {
        ...RootSectorsSection_query
      }
    `,
    {},
  );

  return (
    <main>
      <h1>Home</h1>
      <ErrorBoundary fallback={<p>Error in RootSectorsSection</p>}>
        <RootSectorsSection queryRef={data} />
      </ErrorBoundary>
    </main>
  );
}
