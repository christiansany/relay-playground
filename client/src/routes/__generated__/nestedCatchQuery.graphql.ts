/**
 * @generated SignedSource<<87c080616dd93d7865aa9e95c27f3ad6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type nestedCatchQuery$variables = Record<PropertyKey, never>;
export type nestedCatchQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NestedCatchNullRepro_query" | "NestedCatchResultRepro_query">;
};
export type nestedCatchQuery = {
  response: nestedCatchQuery$data;
  variables: nestedCatchQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "nestedCatchQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "NestedCatchResultRepro_query"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "NestedCatchNullRepro_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "nestedCatchQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 1
          }
        ],
        "concreteType": "SectorConnection",
        "kind": "LinkedField",
        "name": "sectors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SectorEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Sector",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "sectors(first:1)"
      }
    ]
  },
  "params": {
    "cacheID": "9fda8a7e6017cb7377ca3f1457b1bd62",
    "id": null,
    "metadata": {},
    "name": "nestedCatchQuery",
    "operationKind": "query",
    "text": "query nestedCatchQuery {\n  ...NestedCatchResultRepro_query\n  ...NestedCatchNullRepro_query\n}\n\nfragment NestedCatchNullRepro_query on Query {\n  sectors(first: 1) {\n    edges {\n      node {\n        id\n        name @simulateError\n      }\n    }\n  }\n}\n\nfragment NestedCatchResultRepro_query on Query {\n  sectors(first: 1) {\n    edges {\n      node {\n        id\n        name @simulateError\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "f4b288725c06f7e5063c6e31ded4a8cd";

export default node;
