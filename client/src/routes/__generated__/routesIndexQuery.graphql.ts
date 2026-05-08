/**
 * @generated SignedSource<<5c2ed17eeb53e0622faf680dd2886b49>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type routesIndexQuery$variables = Record<PropertyKey, never>;
export type routesIndexQuery$data = {
  readonly sectors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly slug: string;
      };
    }>;
  };
};
export type routesIndexQuery = {
  response: routesIndexQuery$data;
  variables: routesIndexQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "routesIndexQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "routesIndexQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8b27068178e2d9a2e866ebac0d3a9bd6",
    "id": null,
    "metadata": {},
    "name": "routesIndexQuery",
    "operationKind": "query",
    "text": "query routesIndexQuery {\n  sectors(first: 50) {\n    edges {\n      node {\n        id\n        slug\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "107ee492bad46ef4c745bb6fc22a7c74";

export default node;
