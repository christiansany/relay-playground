import { Suspense } from "react";
import { graphql, useFragment } from "react-relay";
import { Match3D } from "../runtime/Match3D.js";
import type { ProductPageView_page$key } from "./__generated__/ProductPageView_page.graphql.js";

/**
 * Full product page: three independent 3D selections in one fragment. Every
 * extra field with `@module` spreads needs its own `@match(key:)` (prefixed
 * with the document name). Relay stores each one under
 * `__module_component_<key>`, so the selections can't collide even if two
 * fields return the same record. Without the keys the compiler fails with
 * "documents with multiple fields containing 3D selections must specify a
 * unique 'key' value for each field".
 *
 * Used by the lab ("multiple keys" demo) and by the SSR page.
 */
export function ProductPageView({ page }: { page: ProductPageView_page$key }) {
  const data = useFragment(
    graphql`
      fragment ProductPageView_page on ProductPage {
        title
        energyLabel @match(key: "ProductPageView_page_energyLabel") {
          ...EnergyLabelBadge_label @module(name: "../blocks/EnergyLabelBadge")
        }
        priceDisplay @match(key: "ProductPageView_page_price") {
          __typename
          ...RegularPrice_price @module(name: "../prices/RegularPrice")
          ...SalePrice_price @module(name: "../prices/SalePrice")
          ...BundlePrice_price @module(name: "../prices/BundlePrice")
        }
        blocks {
          __typename
          ...TextBlock_block @module(name: "../blocks/TextBlock")
          ...ImageGalleryBlock_block @module(name: "../blocks/ImageGalleryBlock")
          ...VideoBlock_block @module(name: "../blocks/VideoBlock")
          ...SpecsBlock_block @module(name: "../blocks/SpecsBlock")
          ...ReviewHighlightBlock_block @module(name: "../blocks/ReviewHighlightBlock")
          ...CarouselBlock_block @module(name: "../blocks/CarouselBlock")
        }
      }
    `,
    page,
  );
  return (
    <article>
      <h3>{data.title}</h3>
      <p>
        <Suspense fallback={<span className="fallback">loading price…</span>}>
          <Match3D match={data.priceDisplay} />
        </Suspense>{" "}
        {data.energyLabel && (
          <Suspense fallback={<span className="fallback">loading label…</span>}>
            <Match3D match={data.energyLabel} />
          </Suspense>
        )}
      </p>
      {data.blocks.map((block, i) => (
        <Suspense key={i} fallback={<p className="fallback">loading {block.__typename}…</p>}>
          <Match3D
            match={block}
            fallback={<p className="fallback">no @module for {block.__typename}</p>}
          />
        </Suspense>
      ))}
    </article>
  );
}
