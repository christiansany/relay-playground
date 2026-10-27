/**
 * @generated SignedSource<<64c9d78711fdb4160e5e8e121d6a761a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorListsConnectionQuery$variables = {
  errIds: ReadonlyArray<string>;
  id: string;
};
export type idErrorListsConnectionQuery$data = {
  readonly productTypeById: {
    readonly " $fragmentSpreads": FragmentRefs<"idErrorLists_products">;
  } | null;
};
export type idErrorListsConnectionQuery = {
  response: idErrorListsConnectionQuery$data;
  variables: idErrorListsConnectionQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "errIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorListsConnectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeById",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "errIds",
                "variableName": "errIds"
              }
            ],
            "kind": "FragmentSpread",
            "name": "idErrorLists_products"
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
    "name": "idErrorListsConnectionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeById",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*:: as any*/),
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
                      (v4/*:: as any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v4/*:: as any*/)
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
            "args": (v3/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "idErrorLists_products",
            "kind": "LinkedHandle",
            "name": "products"
          },
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e11e1b969df8a547924bcb5577f83420",
    "id": null,
    "metadata": {},
    "name": "idErrorListsConnectionQuery",
    "operationKind": "query",
    "text": "query idErrorListsConnectionQuery(\n  $id: ID!\n  $errIds: [ID!]!\n) {\n  productTypeById(id: $id) {\n    ...idErrorLists_products_3UhG5R\n    id\n  }\n}\n\nfragment idErrorLists_products_3UhG5R on ProductType {\n  products(first: 3) {\n    edges {\n      node {\n        id @simulateError(onlyForIds: $errIds)\n        name\n        __typename\n        id\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();

(node as any).hash = "f15484d09cc63f1f65e76383ba93d8ee";

export default node;
