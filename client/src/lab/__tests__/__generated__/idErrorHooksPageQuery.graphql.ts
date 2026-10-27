/**
 * @generated SignedSource<<d07fc1c2abc8e2b562888081d54dd61d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorHooksPageQuery$variables = {
  err: boolean;
};
export type idErrorHooksPageQuery$data = {
  readonly productTypeBySlug: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"idErrorHooks_productType" | "idErrorHooks_products">;
  } | null;
};
export type idErrorHooksPageQuery = {
  response: idErrorHooksPageQuery$data;
  variables: idErrorHooksPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "err"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "slug",
    "value": "beverages"
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
  "name": "name",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorHooksPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeBySlug",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "idErrorHooks_productType"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "idErrorHooks_products"
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorHooksPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeBySlug",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": (v4/*:: as any*/),
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
            "args": (v4/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "idErrorHooks_products",
            "kind": "LinkedHandle",
            "name": "products"
          }
        ],
        "storageKey": "productTypeBySlug(slug:\"beverages\")"
      }
    ]
  },
  "params": {
    "cacheID": "69aa98786e999fee16d5ab48a3bc3735",
    "id": null,
    "metadata": {},
    "name": "idErrorHooksPageQuery",
    "operationKind": "query",
    "text": "query idErrorHooksPageQuery(\n  $err: Boolean!\n) {\n  productTypeBySlug(slug: \"beverages\") {\n    id @simulateError(if: $err)\n    ...idErrorHooks_productType\n    ...idErrorHooks_products\n  }\n}\n\nfragment idErrorHooks_productType on ProductType {\n  name\n  id\n}\n\nfragment idErrorHooks_products on ProductType {\n  products(first: 2) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "e896034916384ad0bb8f2b441ee55cc3";

export default node;
