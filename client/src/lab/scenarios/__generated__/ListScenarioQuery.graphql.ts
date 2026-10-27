/**
 * @generated SignedSource<<93f7b09a7de90d6e97c8d19d22fa1fad>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListScenarioQuery$variables = {
  errIds: ReadonlyArray<string>;
};
export type ListScenarioQuery$data = {
  readonly sectors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __id: string;
        readonly id: string;
        readonly name: string | null;
        readonly " $fragmentSpreads": FragmentRefs<"ListScenarioDetail_sector">;
      } | null;
    } | null> | null;
  } | null;
};
export type ListScenarioQuery = {
  response: ListScenarioQuery$data;
  variables: ListScenarioQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "errIds"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListScenarioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
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
                  (v2/*:: as any*/),
                  (v3/*:: as any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ListScenarioDetail_sector"
                  },
                  (v4/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "sectors(first:5)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "ListScenarioQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
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
                  (v2/*:: as any*/),
                  (v3/*:: as any*/),
                  (v2/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v4/*:: as any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "sectors(first:5)"
      }
    ]
  },
  "params": {
    "cacheID": "80cb37e3b821e7e5283808565f0912b8",
    "id": null,
    "metadata": {},
    "name": "ListScenarioQuery",
    "operationKind": "query",
    "text": "query ListScenarioQuery(\n  $errIds: [ID!]!\n) {\n  sectors(first: 5) {\n    edges {\n      node {\n        id @simulateError(onlyForIds: $errIds)\n        name\n        ...ListScenarioDetail_sector\n      }\n    }\n  }\n}\n\nfragment ListScenarioDetail_sector on Sector {\n  id\n  name\n  slug\n}\n"
  }
};
})();

(node as any).hash = "2fcffffb03306cc9364801602c58e34f";

export default node;
