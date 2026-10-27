/**
 * @generated SignedSource<<5d4c8ded7ef6714815e654c5bf1f93b8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorListsSectorsQuery$variables = {
  errIds: ReadonlyArray<string>;
};
export type idErrorListsSectorsQuery$data = {
  readonly sectors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string | null;
        readonly " $fragmentSpreads": FragmentRefs<"idErrorLists_sector">;
      } | null;
    } | null> | null;
  } | null;
};
export type idErrorListsSectorsQuery = {
  response: idErrorListsSectorsQuery$data;
  variables: idErrorListsSectorsQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorListsSectorsQuery",
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
                    "name": "idErrorLists_sector"
                  }
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
    "name": "idErrorListsSectorsQuery",
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
                  (v3/*:: as any*/)
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
    "cacheID": "50c37252daf7e278b5615479e49ca0a9",
    "id": null,
    "metadata": {},
    "name": "idErrorListsSectorsQuery",
    "operationKind": "query",
    "text": "query idErrorListsSectorsQuery(\n  $errIds: [ID!]!\n) {\n  sectors(first: 5) {\n    edges {\n      node {\n        id @simulateError(onlyForIds: $errIds)\n        name\n        ...idErrorLists_sector\n      }\n    }\n  }\n}\n\nfragment idErrorLists_sector on Sector {\n  name\n}\n"
  }
};
})();

(node as any).hash = "6bf35fb5483a56ecbe65f343715173d6";

export default node;
