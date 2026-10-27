import { Suspense } from "react";
import { graphql, useFragment, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { readModule } from "../runtime/moduleRef.js";
import type { Demo } from "./types.js";
import NonReactModuleDemoQueryNode, {
  type NonReactModuleDemoQuery,
} from "./__generated__/NonReactModuleDemoQuery.graphql.js";
import type { NonReactModuleDemo_specs$key } from "./__generated__/NonReactModuleDemo_specs.graphql.js";

type SpecsToCsv = typeof import("../formatters/specsCsv.js").default;

function View({ queryRef }: { queryRef: PreloadedQuery<NonReactModuleDemoQuery> }) {
  const data = usePreloadedQuery<NonReactModuleDemoQuery>(
    graphql`
      query NonReactModuleDemoQuery($slug: String!) {
        productPage(slug: $slug) {
          title
          blocks {
            __typename
            ...NonReactModuleDemo_specs @module(name: "../formatters/specsCsv")
          }
        }
      }
    `,
    queryRef,
  );
  const page = data.productPage;
  if (page == null) return <p>Not found.</p>;
  return (
    <article>
      <h3>{page.title}</h3>
      {page.blocks.map((block, i) =>
        // The reader only adds `__module_component` for blocks whose type
        // matched the @module spread (SpecsBlock). The other blocks come
        // back as `{ __typename }` only.
        "__module_component" in block && block.__module_component != null ? (
          <Suspense key={i} fallback={<p className="fallback">loading formatter…</p>}>
            <SpecsExport moduleRef={block.__module_component} specs={block} />
          </Suspense>
        ) : (
          <p key={i} className="fallback">
            {block.__typename}: no formatter needed
          </p>
        ),
      )}
    </article>
  );
}

function SpecsExport({
  moduleRef,
  specs,
}: {
  moduleRef: unknown;
  specs: NonReactModuleDemo_specs$key;
}) {
  // Suspends until the formatter chunk has loaded.
  const specsToCsv = readModule(moduleRef) as SpecsToCsv;
  const data = useFragment(
    graphql`
      fragment NonReactModuleDemo_specs on SpecsBlock {
        specs {
          label
          value
        }
      }
    `,
    specs,
  );
  return <pre className="block">{specsToCsv(data.specs)}</pre>;
}

export const nonReactModuleDemo: Demo<NonReactModuleDemoQuery> = {
  id: "non-react",
  title: "Non-React module (read __module_component yourself)",
  slug: "espresso-machine",
  query: NonReactModuleDemoQueryNode,
  View,
  explainer: (
    <p>
      <code>@module</code> can point at any JS module. Here a CSV formatter is only downloaded if
      the page contains a SpecsBlock. Relay puts the reference on the data as{" "}
      <code>__module_component</code>. You load it and use the fragment yourself.
    </p>
  ),
};
