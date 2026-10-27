/**
 * @generated SignedSource<<5f52fe9a8e56a7e866a7cb0a21ccb954>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorQueriesNameOnlyQuery$variables = {
  id: string;
};
export type idErrorQueriesNameOnlyQuery$data = {
  readonly productById: {
    readonly name: string;
  } | null;
};
export type idErrorQueriesNameOnlyQuery = {
  response: idErrorQueriesNameOnlyQuery$data;
  variables: idErrorQueriesNameOnlyQuery$variables;
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "idErrorQueriesNameOnlyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "productById",
        "plural": false,
        "selections": [
          (v2/*:: as any*/)
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
    "name": "idErrorQueriesNameOnlyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "productById",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fb16c419e05748fb1243b987d34711cb",
    "id": null,
    "metadata": {},
    "name": "idErrorQueriesNameOnlyQuery",
    "operationKind": "query",
    "text": "query idErrorQueriesNameOnlyQuery(\n  $id: ID!\n) {\n  productById(id: $id) {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1c5395133de531fcf9b08df837e3821d";

export default node;
