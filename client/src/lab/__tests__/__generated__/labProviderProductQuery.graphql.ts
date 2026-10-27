/**
 * @generated SignedSource<<bff97f10d9885d1463ebb2da5c69ec78>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type labProviderProductQuery$variables = {
  id: string;
};
export type labProviderProductQuery$data = {
  readonly productById: {
    readonly id: string;
    readonly name: string | null;
  } | null;
};
export type labProviderProductQuery = {
  response: labProviderProductQuery$data;
  variables: labProviderProductQuery$variables;
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "labProviderProductQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "labProviderProductQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "b60d88937f38319ff1b022712a238676",
    "id": null,
    "metadata": {},
    "name": "labProviderProductQuery",
    "operationKind": "query",
    "text": "query labProviderProductQuery(\n  $id: ID!\n) {\n  productById(id: $id) {\n    id @simulateError\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "3ba48b35d03ef497fd5a17e925d2448c";

export default node;
