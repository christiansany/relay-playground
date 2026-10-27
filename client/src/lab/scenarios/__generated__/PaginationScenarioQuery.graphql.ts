/**
 * @generated SignedSource<<0ff05888f61ad8ba3b3680f279f0a657>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PaginationScenarioQuery$variables = {
  err: boolean;
};
export type PaginationScenarioQuery$data = {
  readonly productTypeBySlug: {
    readonly __id: string;
    readonly id: string;
    readonly name: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"PaginationScenario_products" | "PaginationScenario_throwingProducts">;
  } | null;
};
export type PaginationScenarioQuery = {
  response: PaginationScenarioQuery$data;
  variables: PaginationScenarioQuery$variables;
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
v4 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v5 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PaginationScenarioQuery",
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PaginationScenario_products"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PaginationScenario_throwingProducts"
          },
          (v4/*:: as any*/)
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
    "name": "PaginationScenarioQuery",
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
          {
            "alias": null,
            "args": (v5/*:: as any*/),
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
            "storageKey": "products(first:3)"
          },
          {
            "alias": null,
            "args": (v5/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "PaginationScenario_products",
            "kind": "LinkedHandle",
            "name": "products"
          },
          {
            "alias": null,
            "args": (v5/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "PaginationScenarioThrowing_products",
            "kind": "LinkedHandle",
            "name": "products"
          },
          (v2/*:: as any*/),
          (v4/*:: as any*/)
        ],
        "storageKey": "productTypeBySlug(slug:\"beverages\")"
      }
    ]
  },
  "params": {
    "cacheID": "f834a2acf7bb43a3b302d94105df1144",
    "id": null,
    "metadata": {},
    "name": "PaginationScenarioQuery",
    "operationKind": "query",
    "text": "query PaginationScenarioQuery(\n  $err: Boolean!\n) {\n  productTypeBySlug(slug: \"beverages\") {\n    id @simulateError(if: $err)\n    name\n    ...PaginationScenario_products\n    ...PaginationScenario_throwingProducts\n  }\n}\n\nfragment PaginationScenario_products on ProductType {\n  products(first: 3) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n\nfragment PaginationScenario_throwingProducts on ProductType {\n  products(first: 3) {\n    edges {\n      node {\n        name\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "852fbe00ed8d83cdd0f735d15b75330b";

export default node;
