import { Suspense } from "react";
import { graphql, usePreloadedQuery, type PreloadedQuery } from "react-relay";
import { Match3D } from "../runtime/Match3D.js";
import type { Demo } from "../demos/types.js";
import "./registry.js";
import Server3DDemoQueryNode, {
  type Server3DDemoQuery,
} from "./__generated__/Server3DDemoQuery.graphql.js";

function View({ queryRef }: { queryRef: PreloadedQuery<Server3DDemoQuery> }) {
  const data = usePreloadedQuery<Server3DDemoQuery>(
    graphql`
      query Server3DDemoQuery($slug: String!) {
        productPage(slug: $slug) {
          title
          blocks {
            __typename
            # Same syntax as compiler 3D. Because this file belongs to the
            # "server3d" Relay project, the compiler adds
            #   __module_component_Server3DDemoQuery: js(module: "Server3DTextBlock", id: "Server3DDemoQuery.productPage.blocks")
            #   __module_operation_Server3DDemoQuery: js(module: "Server3DTextBlock_block$normalization.graphql", id: ...)
            # to each "... on Type", and the server resolves them.
            ...Server3DTextBlock_block @module(name: "Server3DTextBlock")
            ...Server3DVideoBlock_block @module(name: "Server3DVideoBlock")
            ...Server3DSpecsBlock_block @module(name: "Server3DSpecsBlock")
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
      {page.blocks.map((block, i) => (
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

export const server3dDemo: Demo<Server3DDemoQuery> = {
  id: "server-3d",
  title: "Server 3D: the server returns the module references",
  slug: "noise-cancelling-headphones",
  query: Server3DDemoQueryNode,
  View,
  explainer: (
    <p>
      The query now contains <code>js(module: …)</code> fields and the store holds plain{" "}
      <b>strings</b>. Strings survive <code>JSON.stringify</code>, which matters for SSR. The server
      also lists the modules in <code>extensions.jsModules</code>, so the client starts the
      downloads as soon as the response arrives (toggle "preload from extensions" and compare the
      log). Set the variant to <b>B</b> and the server swaps the video player without any client
      change.
    </p>
  ),
};
