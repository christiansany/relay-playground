/**
 * @generated SignedSource<<f9ee4828e50e7451ac7e043d3c6b0d1c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @indirectDataDrivenDependency ProductPageView_page.blocks {"branches":{"CarouselBlock":{"component":"../blocks/CarouselBlock","fragment":"CarouselBlock_block$normalization.graphql"},"ImageGalleryBlock":{"component":"../blocks/ImageGalleryBlock","fragment":"ImageGalleryBlock_block$normalization.graphql"},"ReviewHighlightBlock":{"component":"../blocks/ReviewHighlightBlock","fragment":"ReviewHighlightBlock_block$normalization.graphql"},"SpecsBlock":{"component":"../blocks/SpecsBlock","fragment":"SpecsBlock_block$normalization.graphql"},"TextBlock":{"component":"../blocks/TextBlock","fragment":"TextBlock_block$normalization.graphql"},"VideoBlock":{"component":"../blocks/VideoBlock","fragment":"VideoBlock_block$normalization.graphql"}},"plural":true}
// @indirectDataDrivenDependency ProductPageView_page.energyLabel {"branches":{"EnergyLabel":{"component":"../blocks/EnergyLabelBadge","fragment":"EnergyLabelBadge_label$normalization.graphql"}},"plural":false}
// @indirectDataDrivenDependency ProductPageView_page.priceDisplay {"branches":{"BundlePrice":{"component":"../prices/BundlePrice","fragment":"BundlePrice_price$normalization.graphql"},"RegularPrice":{"component":"../prices/RegularPrice","fragment":"RegularPrice_price$normalization.graphql"},"SalePrice":{"component":"../prices/SalePrice","fragment":"SalePrice_price$normalization.graphql"}},"plural":false}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SsrPageQuery$variables = {
  slug: string;
};
export type SsrPageQuery$data = {
  readonly productPage: {
    readonly " $fragmentSpreads": FragmentRefs<"ProductPageView_page">;
  } | null;
};
export type SsrPageQuery = {
  response: SsrPageQuery$data;
  variables: SsrPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SsrPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductPage",
        "kind": "LinkedField",
        "name": "productPage",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProductPageView_page"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "SsrPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductPage",
        "kind": "LinkedField",
        "name": "productPage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EnergyLabel",
            "kind": "LinkedField",
            "name": "energyLabel",
            "plural": false,
            "selections": [
              {
                "args": null,
                "documentName": "ProductPageView_page_energyLabel",
                "fragmentName": "EnergyLabelBadge_label",
                "fragmentPropName": "label",
                "kind": "ModuleImport",
                "componentModuleProvider": Object.assign(() => import('../../blocks/EnergyLabelBadge'), { modulePath: '../../blocks/EnergyLabelBadge', importer: import.meta.url }),
                "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/EnergyLabelBadge_label$normalization.graphql'), { modulePath: '../../blocks/__generated__/EnergyLabelBadge_label$normalization.graphql', importer: import.meta.url })
              },
              (v2/*:: as any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "supported",
                "value": "2ABxQN"
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "priceDisplay",
            "plural": false,
            "selections": [
              (v3/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page_price",
                    "fragmentName": "RegularPrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../prices/RegularPrice'), { modulePath: '../../prices/RegularPrice', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../prices/__generated__/RegularPrice_price$normalization.graphql'), { modulePath: '../../prices/__generated__/RegularPrice_price$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "RegularPrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page_price",
                    "fragmentName": "SalePrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../prices/SalePrice'), { modulePath: '../../prices/SalePrice', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../prices/__generated__/SalePrice_price$normalization.graphql'), { modulePath: '../../prices/__generated__/SalePrice_price$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "SalePrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page_price",
                    "fragmentName": "BundlePrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../prices/BundlePrice'), { modulePath: '../../prices/BundlePrice', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../prices/__generated__/BundlePrice_price$normalization.graphql'), { modulePath: '../../prices/__generated__/BundlePrice_price$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "BundlePrice",
                "abstractKey": null
              }
            ],
            "storageKey": "priceDisplay(supported:\"2ABxQN\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "blocks",
            "plural": true,
            "selections": [
              (v3/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page",
                    "fragmentName": "TextBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/TextBlock'), { modulePath: '../../blocks/TextBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/TextBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/TextBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "TextBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page",
                    "fragmentName": "ImageGalleryBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/ImageGalleryBlock'), { modulePath: '../../blocks/ImageGalleryBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/ImageGalleryBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/ImageGalleryBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "ImageGalleryBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page",
                    "fragmentName": "VideoBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/VideoBlock'), { modulePath: '../../blocks/VideoBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/VideoBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/VideoBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "VideoBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page",
                    "fragmentName": "SpecsBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/SpecsBlock'), { modulePath: '../../blocks/SpecsBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/SpecsBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/SpecsBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "SpecsBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page",
                    "fragmentName": "ReviewHighlightBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/ReviewHighlightBlock'), { modulePath: '../../blocks/ReviewHighlightBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/ReviewHighlightBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/ReviewHighlightBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "ReviewHighlightBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "ProductPageView_page",
                    "fragmentName": "CarouselBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/CarouselBlock'), { modulePath: '../../blocks/CarouselBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/CarouselBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/CarouselBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v2/*:: as any*/)
                ],
                "type": "CarouselBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*:: as any*/)
                ],
                "type": "ComparisonBlock",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "81a7b2818dfb4a5bffa50d4ece23a97a",
    "id": null,
    "metadata": {},
    "name": "SsrPageQuery",
    "operationKind": "query",
    "text": "query SsrPageQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    ...ProductPageView_page\n    id\n  }\n}\n\nfragment BundlePrice_price on BundlePrice {\n  amount\n  bundleItems\n}\n\nfragment CarouselBlock_block on CarouselBlock {\n  title\n  items {\n    __typename\n    ... on TextBlock {\n      ...TextBlock_block\n      id\n    }\n    ... on ImageGalleryBlock {\n      ...ImageGalleryBlock_block\n      id\n    }\n    ... on VideoBlock {\n      ...VideoBlock_block\n      id\n    }\n    ... on SpecsBlock {\n      ...SpecsBlock_block\n      id\n    }\n    ... on ReviewHighlightBlock {\n      ...ReviewHighlightBlock_block\n      id\n    }\n    ... on CarouselBlock {\n      id\n    }\n    ... on ComparisonBlock {\n      id\n    }\n  }\n}\n\nfragment EnergyLabelBadge_label on EnergyLabel {\n  grade\n  kwhPerYear\n}\n\nfragment ImageGalleryBlock_block on ImageGalleryBlock {\n  images {\n    url\n    alt\n  }\n}\n\nfragment ProductPageView_page on ProductPage {\n  title\n  energyLabel {\n    ...EnergyLabelBadge_label\n    id\n  }\n  priceDisplay(supported: [\"RegularPrice\", \"SalePrice\", \"BundlePrice\"]) {\n    __typename\n    ... on RegularPrice {\n      ...RegularPrice_price\n      id\n    }\n    ... on SalePrice {\n      ...SalePrice_price\n      id\n    }\n    ... on BundlePrice {\n      ...BundlePrice_price\n      id\n    }\n  }\n  blocks {\n    __typename\n    ... on TextBlock {\n      ...TextBlock_block\n      id\n    }\n    ... on ImageGalleryBlock {\n      ...ImageGalleryBlock_block\n      id\n    }\n    ... on VideoBlock {\n      ...VideoBlock_block\n      id\n    }\n    ... on SpecsBlock {\n      ...SpecsBlock_block\n      id\n    }\n    ... on ReviewHighlightBlock {\n      ...ReviewHighlightBlock_block\n      id\n    }\n    ... on CarouselBlock {\n      ...CarouselBlock_block\n      id\n    }\n    ... on ComparisonBlock {\n      id\n    }\n  }\n}\n\nfragment RegularPrice_price on RegularPrice {\n  amount\n}\n\nfragment ReviewHighlightBlock_block on ReviewHighlightBlock {\n  rating\n  quote\n  author\n}\n\nfragment SalePrice_price on SalePrice {\n  amount\n  originalAmount\n  endsAt\n}\n\nfragment SpecsBlock_block on SpecsBlock {\n  specs {\n    label\n    value\n  }\n}\n\nfragment TextBlock_block on TextBlock {\n  heading\n  body\n}\n\nfragment VideoBlock_block on VideoBlock {\n  title\n  videoUrl\n  durationSeconds\n}\n"
  }
};
})();

(node as any).hash = "c33b6452340088e2084ad3a6a9df05d2";

export default node;
