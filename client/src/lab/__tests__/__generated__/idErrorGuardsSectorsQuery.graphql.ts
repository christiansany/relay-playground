/**
 * @generated SignedSource<<42e656116c88364f0e5b5e135729a0aa>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorGuardsSectorsQuery$variables = {
  errIds: ReadonlyArray<string>;
};
export type idErrorGuardsSectorsQuery$data = {
  readonly sectors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string | null;
        readonly " $fragmentSpreads": FragmentRefs<"idErrorGuards_sector">;
      } | null;
    } | null> | null;
  } | null;
};
export type idErrorGuardsSectorsQuery = {
  response: idErrorGuardsSectorsQuery$data;
  variables: idErrorGuardsSectorsQuery$variables;
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
    "name": "idErrorGuardsSectorsQuery",
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
                    "name": "idErrorGuards_sector"
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
    "name": "idErrorGuardsSectorsQuery",
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
    "cacheID": "365e0fd8cd5aa956eec8de86a43e211f",
    "id": null,
    "metadata": {},
    "name": "idErrorGuardsSectorsQuery",
    "operationKind": "query",
    "text": "query idErrorGuardsSectorsQuery(\n  $errIds: [ID!]!\n) {\n  sectors(first: 5) {\n    edges {\n      node {\n        id @simulateError(onlyForIds: $errIds)\n        name\n        ...idErrorGuards_sector\n      }\n    }\n  }\n}\n\nfragment idErrorGuards_sector on Sector {\n  name\n}\n"
  }
};
})();

(node as any).hash = "ffc6f4927afa19aea5ead802932f6134";

export default node;
