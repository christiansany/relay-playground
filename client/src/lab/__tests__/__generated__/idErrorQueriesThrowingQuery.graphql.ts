/**
 * @generated SignedSource<<4a64cb9bdf7f9280596ae724029d2188>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorQueriesThrowingQuery$variables = {
  err: boolean;
  id: string;
};
export type idErrorQueriesThrowingQuery$data = {
  readonly productById: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type idErrorQueriesThrowingQuery = {
  response: idErrorQueriesThrowingQuery$data;
  variables: idErrorQueriesThrowingQuery$variables;
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
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "idErrorQueriesThrowingQuery",
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
    "name": "idErrorQueriesThrowingQuery",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "f1167e939dea0d081e59128270dc4cc1",
    "id": null,
    "metadata": {},
    "name": "idErrorQueriesThrowingQuery",
    "operationKind": "query",
    "text": "query idErrorQueriesThrowingQuery(\n  $id: ID!\n  $err: Boolean!\n) {\n  productById(id: $id) {\n    id @simulateError(if: $err)\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "25baac1747e9f8d394476a6007330fae";

export default node;
