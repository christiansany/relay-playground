/**
 * @generated SignedSource<<9f6607c38a50c5d630cbbdf2ae495b47>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency MatchStrategyDemoQuery.productPage.basic {"branches":{"RegularPrice":{"component":"../prices/RegularPrice","fragment":"RegularPrice_price$normalization.graphql"}},"plural":false}
// @dataDrivenDependency MatchStrategyDemoQuery.productPage.full {"branches":{"BundlePrice":{"component":"../prices/BundlePrice","fragment":"BundlePrice_price$normalization.graphql"},"RegularPrice":{"component":"../prices/RegularPrice","fragment":"RegularPrice_price$normalization.graphql"},"SalePrice":{"component":"../prices/SalePrice","fragment":"SalePrice_price$normalization.graphql"}},"plural":false}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MatchStrategyDemoQuery$variables = {
  slug: string;
};
export type MatchStrategyDemoQuery$data = {
  readonly productPage: {
    readonly basic: {
      readonly __typename: "RegularPrice";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"RegularPrice_price">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
    readonly full: {
      readonly __typename: "BundlePrice";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"BundlePrice_price">;
    } | {
      readonly __typename: "RegularPrice";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"RegularPrice_price">;
    } | {
      readonly __typename: "SalePrice";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"SalePrice_price">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
    readonly title: string;
  } | null;
};
export type MatchStrategyDemoQuery = {
  response: MatchStrategyDemoQuery$data;
  variables: MatchStrategyDemoQuery$variables;
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
  "name": "title",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "supported",
    "value": "2ABxQN"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "supported",
    "value": "2CXiNr"
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v6/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MatchStrategyDemoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductPage",
        "kind": "LinkedField",
        "name": "productPage",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": "full",
            "args": (v3/*:: as any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "priceDisplay",
            "plural": false,
            "selections": [
              (v4/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery",
                    "fragmentName": "RegularPrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport"
                  }
                ],
                "type": "RegularPrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery",
                    "fragmentName": "SalePrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport"
                  }
                ],
                "type": "SalePrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery",
                    "fragmentName": "BundlePrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport"
                  }
                ],
                "type": "BundlePrice",
                "abstractKey": null
              }
            ],
            "storageKey": "priceDisplay(supported:\"2ABxQN\")"
          },
          {
            "alias": "basic",
            "args": (v5/*:: as any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "priceDisplay",
            "plural": false,
            "selections": [
              (v4/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery_basic",
                    "fragmentName": "RegularPrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport"
                  }
                ],
                "type": "RegularPrice",
                "abstractKey": null
              }
            ],
            "storageKey": "priceDisplay(supported:\"2CXiNr\")"
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
    "name": "MatchStrategyDemoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductPage",
        "kind": "LinkedField",
        "name": "productPage",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": "full",
            "args": (v3/*:: as any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "priceDisplay",
            "plural": false,
            "selections": [
              (v4/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery",
                    "fragmentName": "RegularPrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../prices/RegularPrice'), { modulePath: '../../prices/RegularPrice', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../prices/__generated__/RegularPrice_price$normalization.graphql'), { modulePath: '../../prices/__generated__/RegularPrice_price$normalization.graphql', importer: import.meta.url })
                  },
                  (v6/*:: as any*/)
                ],
                "type": "RegularPrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery",
                    "fragmentName": "SalePrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../prices/SalePrice'), { modulePath: '../../prices/SalePrice', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../prices/__generated__/SalePrice_price$normalization.graphql'), { modulePath: '../../prices/__generated__/SalePrice_price$normalization.graphql', importer: import.meta.url })
                  },
                  (v6/*:: as any*/)
                ],
                "type": "SalePrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery",
                    "fragmentName": "BundlePrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../prices/BundlePrice'), { modulePath: '../../prices/BundlePrice', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../prices/__generated__/BundlePrice_price$normalization.graphql'), { modulePath: '../../prices/__generated__/BundlePrice_price$normalization.graphql', importer: import.meta.url })
                  },
                  (v6/*:: as any*/)
                ],
                "type": "BundlePrice",
                "abstractKey": null
              }
            ],
            "storageKey": "priceDisplay(supported:\"2ABxQN\")"
          },
          {
            "alias": "basic",
            "args": (v5/*:: as any*/),
            "concreteType": null,
            "kind": "LinkedField",
            "name": "priceDisplay",
            "plural": false,
            "selections": [
              (v4/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "MatchStrategyDemoQuery_basic",
                    "fragmentName": "RegularPrice_price",
                    "fragmentPropName": "price",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../prices/RegularPrice'), { modulePath: '../../prices/RegularPrice', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../prices/__generated__/RegularPrice_price$normalization.graphql'), { modulePath: '../../prices/__generated__/RegularPrice_price$normalization.graphql', importer: import.meta.url })
                  },
                  (v6/*:: as any*/)
                ],
                "type": "RegularPrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*:: as any*/),
                "type": "BundlePrice",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*:: as any*/),
                "type": "SalePrice",
                "abstractKey": null
              }
            ],
            "storageKey": "priceDisplay(supported:\"2CXiNr\")"
          },
          (v6/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5b1c4423c7b8a2ad327e249af0a523a2",
    "id": null,
    "metadata": {},
    "name": "MatchStrategyDemoQuery",
    "operationKind": "query",
    "text": "query MatchStrategyDemoQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    title\n    full: priceDisplay(supported: [\"RegularPrice\", \"SalePrice\", \"BundlePrice\"]) {\n      __typename\n      ... on RegularPrice {\n        ...RegularPrice_price\n        id\n      }\n      ... on SalePrice {\n        ...SalePrice_price\n        id\n      }\n      ... on BundlePrice {\n        ...BundlePrice_price\n        id\n      }\n    }\n    basic: priceDisplay(supported: [\"RegularPrice\"]) {\n      __typename\n      ... on RegularPrice {\n        ...RegularPrice_price\n        id\n      }\n      ... on BundlePrice {\n        id\n      }\n      ... on SalePrice {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment BundlePrice_price on BundlePrice {\n  amount\n  bundleItems\n}\n\nfragment RegularPrice_price on RegularPrice {\n  amount\n}\n\nfragment SalePrice_price on SalePrice {\n  amount\n  originalAmount\n  endsAt\n}\n"
  }
};
})();

(node as any).hash = "d44960ff59b7c514ffb66efb4af267ea";

export default node;
