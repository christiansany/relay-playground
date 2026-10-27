import type { ApolloServerPlugin } from "@apollo/server";
import { productPages, type PriceRecord, type ProductPageRecord } from "./data/productPages.js";

/**
 * Per-request context for "Server 3D". Every `js(module:)` field the server
 * resolves is recorded here, and `threeDPlugin` mirrors the list into
 * `extensions.jsModules`. A client can then start downloading those modules
 * as soon as the response arrives, before Relay normalizes the payload or
 * React renders it. A real server could go further and send `Link:
 * rel=modulepreload` headers or 103 Early Hints.
 */
export type ThreeDContext = {
  jsModules: Set<string>;
  /** Value of the `x-3d-variant` request header (Server 3D experiment demo). */
  variant: string | undefined;
};

export function createThreeDContext(headers: Record<string, string | string[] | undefined>) {
  const variant = headers["x-3d-variant"];
  return {
    jsModules: new Set<string>(),
    variant: Array.isArray(variant) ? variant[0] : variant,
  } satisfies ThreeDContext;
}

/**
 * Resolver for `js(module: String!, id: String): JSDependency`. The Relay
 * compiler generates two aliased selections for every concrete type that a
 * fragment spread with `@module` targets:
 *
 *   __module_component_<key>: js(module: "<@module name>", id: "<doc>.<path>")
 *   __module_operation_<key>: js(module: "<Fragment>$normalization.graphql", id: ...)
 *
 * The server decides what goes back. Echoing the name is the minimum. Because
 * the server owns the answer, it can also swap in a different implementation:
 * here the `x-3d-variant: b` header serves an alternative video player
 * without a client deploy.
 */
function resolveJs(_parent: unknown, args: { module: string; id?: string }, ctx: ThreeDContext) {
  let reference = args.module;
  if (ctx.variant === "b" && reference === "Server3DVideoBlock") {
    reference = "Server3DVideoBlockB";
  }
  ctx.jsModules.add(reference);
  return reference;
}

const jsResolver = { js: resolveJs };

function choosePrice(page: ProductPageRecord, supported: readonly string[] | null | undefined) {
  // Clients that don't send `supported` (plain queries without @match) get
  // the best strategy. Otherwise pick the first strategy this product
  // qualifies for that the client can render. That's the @match "negotiation".
  if (supported == null) return page.prices[0] ?? null;
  return page.prices.find((p: PriceRecord) => supported.includes(p.__typename)) ?? null;
}

export const threeDResolvers = {
  Query: {
    productPage: (_: unknown, { slug }: { slug: string }) =>
      productPages.find((p) => p.slug === slug) ?? null,
    productPages: () => productPages,
  },
  ProductPage: {
    priceDisplay: (page: ProductPageRecord, { supported }: { supported?: string[] | null }) =>
      choosePrice(page, supported),
  },
  ProductPageBlock: {
    __resolveType: (obj: { __typename: string }) => obj.__typename,
  },
  PriceDisplay: {
    __resolveType: (obj: { __typename: string }) => obj.__typename,
  },
  TextBlock: jsResolver,
  ImageGalleryBlock: jsResolver,
  VideoBlock: jsResolver,
  SpecsBlock: jsResolver,
  ReviewHighlightBlock: jsResolver,
  CarouselBlock: jsResolver,
  ComparisonBlock: jsResolver,
  EnergyLabel: jsResolver,
  RegularPrice: jsResolver,
  SalePrice: jsResolver,
  BundlePrice: jsResolver,
};

export const threeDPlugin: ApolloServerPlugin<ThreeDContext> = {
  async requestDidStart() {
    return {
      async willSendResponse({ response, contextValue }) {
        if (response.body.kind !== "single" || contextValue.jsModules.size === 0) return;
        response.body.singleResult.extensions = {
          ...response.body.singleResult.extensions,
          jsModules: [...contextValue.jsModules],
        };
      },
    };
  },
};
