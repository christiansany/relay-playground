import { Suspense } from "react";
import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { Match3D } from "../runtime/Match3D.js";
import type { Demo } from "./types.js";
import NullableFieldDemoQueryNode, {
  type NullableFieldDemoQuery,
} from "./__generated__/NullableFieldDemoQuery.graphql.js";

function View({ queryRef }: { queryRef: PreloadedQuery<NullableFieldDemoQuery> }) {
  const data = usePreloadedQuery<NullableFieldDemoQuery>(
    graphql`
      query NullableFieldDemoQuery($slug: String!) {
        productPage(slug: $slug) {
          title
          # @module also works on a concrete-typed field (no union needed).
          # When the field is null, nothing is normalized and nothing is
          # downloaded.
          energyLabel {
            ...EnergyLabelBadge_label @module(name: "../blocks/EnergyLabelBadge")
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
      {page.energyLabel == null ? (
        <p className="fallback">no energy label: EnergyLabelBadge chunk is never requested</p>
      ) : (
        <Suspense fallback={<p className="fallback">loading badge…</p>}>
          <Match3D match={page.energyLabel} />
        </Suspense>
      )}
    </article>
  );
}

export const nullableFieldDemo: Demo<NullableFieldDemoQuery> = {
  id: "nullable",
  title: "@module on a usually-null field",
  slug: "espresso-machine",
  query: NullableFieldDemoQueryNode,
  View,
  explainer: (
    <p>
      Only <code>espresso-machine</code> has an energy label. For the other products, the badge
      component and its normalization AST are never downloaded.
    </p>
  ),
};
