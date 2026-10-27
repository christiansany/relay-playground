/**
 * @generated SignedSource<<d2d5dbebd5f33e7e770a6080a381f7e9>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorHooksThrowingProductsPageQuery$variables = Record<PropertyKey, never>;
export type idErrorHooksThrowingProductsPageQuery$data = {
  readonly productTypeBySlug: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"idErrorHooks_throwingProducts">;
  } | null;
};
export type idErrorHooksThrowingProductsPageQuery = {
  response: idErrorHooksThrowingProductsPageQuery$data;
  variables: idErrorHooksThrowingProductsPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "slug",
    "value": "beverages"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorHooksThrowingProductsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeBySlug",
        "plural": false,
        "selections": [
          (v1/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "idErrorHooks_throwingProducts"
          }
        ],
        "storageKey": "productTypeBySlug(slug:\"beverages\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "idErrorHooksThrowingProductsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeBySlug",
        "plural": false,
        "selections": [
          (v1/*:: as any*/),
          {
            "alias": null,
            "args": (v2/*:: as any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      (v1/*:: as any*/),
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
            "storageKey": "products(first:2)"
          },
          {
            "alias": null,
            "args": (v2/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "idErrorHooksThrowing_products",
            "kind": "LinkedHandle",
            "name": "products"
          },
          (v1/*:: as any*/)
        ],
        "storageKey": "productTypeBySlug(slug:\"beverages\")"
      }
    ]
  },
  "params": {
    "cacheID": "3f53e171f7e81e7c2da65065c280bc79",
    "id": null,
    "metadata": {},
    "name": "idErrorHooksThrowingProductsPageQuery",
    "operationKind": "query",
    "text": "query idErrorHooksThrowingProductsPageQuery {\n  productTypeBySlug(slug: \"beverages\") {\n    id @simulateError\n    ...idErrorHooks_throwingProducts\n  }\n}\n\nfragment idErrorHooks_throwingProducts on ProductType {\n  products(first: 2) {\n    edges {\n      node {\n        name\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "1b6511b08566fb392cf377797fad69e9";

export default node;
