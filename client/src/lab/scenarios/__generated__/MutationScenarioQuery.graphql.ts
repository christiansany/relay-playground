/**
 * @generated SignedSource<<411700c2f7c2d57eb328021b674b436e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type MutationScenarioQuery$variables = {
  id: string;
};
export type MutationScenarioQuery$data = {
  readonly productTypeById: {
    readonly name: string | null;
    readonly products: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly __id: string;
          readonly id: string;
          readonly name: string | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
};
export type MutationScenarioQuery = {
  response: MutationScenarioQuery$data;
  variables: MutationScenarioQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
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
          (v3/*:: as any*/),
          (v2/*:: as any*/),
          {
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
    "name": "MutationScenarioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeById",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": "products",
            "args": null,
            "concreteType": "ProductConnection",
            "kind": "LinkedField",
            "name": "__MutationScenario_products_connection",
            "plural": false,
            "selections": (v4/*:: as any*/),
            "storageKey": null
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
    "name": "MutationScenarioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductType",
        "kind": "LinkedField",
        "name": "productTypeById",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": (v5/*:: as any*/),
            "concreteType": "ProductConnection",
            "kind": "LinkedField",
            "name": "products",
            "plural": false,
            "selections": (v4/*:: as any*/),
            "storageKey": "products(first:3)"
          },
          {
            "alias": null,
            "args": (v5/*:: as any*/),
            "filters": null,
            "handle": "connection",
            "key": "MutationScenario_products",
            "kind": "LinkedHandle",
            "name": "products"
          },
          (v3/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "632bd0b1b1a7ef03405603ca26106456",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": null,
          "cursor": null,
          "direction": "forward",
          "path": [
            "productTypeById",
            "products"
          ]
        }
      ]
    },
    "name": "MutationScenarioQuery",
    "operationKind": "query",
    "text": "query MutationScenarioQuery(\n  $id: ID!\n) {\n  productTypeById(id: $id) {\n    name\n    products(first: 3) {\n      edges {\n        node {\n          id\n          name\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b03fcdcb13e6453677cc8091b602ab9";

export default node;
