/**
 * @generated SignedSource<<c7a5879f8d3853e70972a5f765aa65a2>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorQueriesProductQuery$variables = {
  err: boolean;
  id: string;
};
export type idErrorQueriesProductQuery$data = {
  readonly productById: {
    readonly id: string;
    readonly name: string | null;
  } | null;
};
export type idErrorQueriesProductQuery = {
  response: idErrorQueriesProductQuery$data;
  variables: idErrorQueriesProductQuery$variables;
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
    "metadata": null,
    "name": "idErrorQueriesProductQuery",
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
    "name": "idErrorQueriesProductQuery",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "dd452b15fbb0067b118405c23da6b721",
    "id": null,
    "metadata": {},
    "name": "idErrorQueriesProductQuery",
    "operationKind": "query",
    "text": "query idErrorQueriesProductQuery(\n  $id: ID!\n  $err: Boolean!\n) {\n  productById(id: $id) {\n    id @simulateError(if: $err)\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "a2c3e7be0c4e64821fcbf80aec4d7595";

export default node;
