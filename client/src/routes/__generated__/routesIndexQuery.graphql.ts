/**
 * @generated SignedSource<<faa1b814717a70e974e5bb50d68ff65e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type routesIndexQuery$variables = Record<PropertyKey, never>;
export type routesIndexQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RootSectorsSection_query">;
};
export type routesIndexQuery = {
  response: routesIndexQuery$data;
  variables: routesIndexQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "routesIndexQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "RootSectorsSection_query"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routesIndexQuery",
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 50
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
                    "name": "slug",
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
        "storageKey": "sectors(first:50)"
      }
    ]
  },
  "params": {
    "cacheID": "612247d1037d06346392a764c824b063",
    "id": null,
    "metadata": {},
    "name": "routesIndexQuery",
    "operationKind": "query",
    "text": "query routesIndexQuery {\n  ...RootSectorsSection_query\n}\n\nfragment RootSectorsSection_query on Query {\n  sectors(first: 50) {\n    edges {\n      node {\n        id\n        slug\n        name\n      }\n    }\n  }\n}\n"
  }
};

(node as any).hash = "77a37b4728c5f7df671c0672aef66209";

export default node;
