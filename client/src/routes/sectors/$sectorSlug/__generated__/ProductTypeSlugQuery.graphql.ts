/**
 * @generated SignedSource<<0232b8655bf8d449c4f81bddf6ddb9e8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductTypeSlugQuery$variables = {
  productTypeSlug: string;
  sectorSlug: string;
};
export type ProductTypeSlugQuery$data = {
  readonly productTypeBySlug: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ProductTypeProductsSection_productType">;
  } | null;
  readonly sectorBySlug: {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
  } | null;
};
export type ProductTypeSlugQuery = {
  response: ProductTypeSlugQuery$data;
  variables: ProductTypeSlugQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "productTypeSlug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sectorSlug"
},
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
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "slug",
      "variableName": "sectorSlug"
    }
  ],
  "concreteType": "Sector",
  "kind": "LinkedField",
  "name": "sectorBySlug",
  "plural": false,
  "selections": [
    (v2/*:: as any*/),
    (v3/*:: as any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "productTypeSlug"
  }
],
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 20
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "ProductTypeSlugQuery",
    "selections": [
      (v4/*:: as any*/),
      {
        "alias": null,
        "args": (v5/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeBySlug",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProductTypeProductsSection_productType"
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
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "ProductTypeSlugQuery",
    "selections": [
      (v4/*:: as any*/),
      {
        "alias": null,
        "args": (v5/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeBySlug",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          {
            "alias": null,
            "args": (v6/*:: as any*/),
            "concreteType": "ProductConnection",
            "kind": "LinkedField",
            "name": "products",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ProductEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Product",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*:: as any*/),
                      (v3/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "description",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "price",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "products(first:20)"
          },
          {
            "alias": null,
            "args": (v6/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "ProductTypeProductsSection_productType_products",
            "kind": "LinkedHandle",
            "name": "products"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "94233d296b4261a1a837fa628c788733",
    "id": null,
    "metadata": {},
    "name": "ProductTypeSlugQuery",
    "operationKind": "query",
    "text": "query ProductTypeSlugQuery(\n  $sectorSlug: String!\n  $productTypeSlug: String!\n) {\n  sectorBySlug(slug: $sectorSlug) {\n    id\n    name\n    slug\n  }\n  productTypeBySlug(slug: $productTypeSlug) {\n    id\n    name\n    ...ProductTypeProductsSection_productType\n  }\n}\n\nfragment ProductTypeProductsSection_productType on ProductType {\n  products(first: 20) {\n    edges {\n      node {\n        id\n        name\n        description\n        price\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "76294aeb9b1ca5fe44f5e4ce5bcbe1fd";

export default node;
