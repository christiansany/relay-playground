/**
 * @generated SignedSource<<2e9833ce5bf48f6fd42a8b21c474029c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SingleEntityScenarioProductQuery$variables = {
  err: boolean;
  id: string;
};
export type SingleEntityScenarioProductQuery$data = {
  readonly productById: {
    readonly __id: string;
    readonly id: string;
    readonly name: string | null;
  } | null;
};
export type SingleEntityScenarioProductQuery = {
  response: SingleEntityScenarioProductQuery$data;
  variables: SingleEntityScenarioProductQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "err"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Product",
    "kind": "LinkedField",
    "name": "productById",
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
      },
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SingleEntityScenarioProductQuery",
    "selections": (v2/*:: as any*/),
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
    "name": "SingleEntityScenarioProductQuery",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "032736e09aeb0e0962a0ed69b175d7e6",
    "id": null,
    "metadata": {},
    "name": "SingleEntityScenarioProductQuery",
    "operationKind": "query",
    "text": "query SingleEntityScenarioProductQuery(\n  $id: ID!\n  $err: Boolean!\n) {\n  productById(id: $id) {\n    id @simulateError(if: $err)\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "d48f601a689b4702d164864c87f23076";

export default node;
