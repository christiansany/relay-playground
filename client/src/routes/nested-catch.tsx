import { createFileRoute, Link } from "@tanstack/react-router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { NestedCatchNullRepro } from "../components/NestedCatchNullRepro.js";
import { NestedCatchResultRepro } from "../components/NestedCatchResultRepro.js";
import type { nestedCatchQuery as NestedCatchQueryType } from "./__generated__/nestedCatchQuery.graphql.js";

export const Route = createFileRoute("/nested-catch")({
  component: NestedCatchPage,
});

function NestedCatchPage() {
  const data = useLazyLoadQuery<NestedCatchQueryType>(
    graphql`
      query nestedCatchQuery {
        ...NestedCatchResultRepro_query
        ...NestedCatchNullRepro_query
      }
    `,
    {},
  );

  return (
    <main>
      <p>
        <Link to="/">← Home</Link>
      </p>
      <h1>Nested @catch repro</h1>
      <NestedCatchResultRepro queryRef={data} />
      <NestedCatchNullRepro queryRef={data} />
    </main>
  );
}
