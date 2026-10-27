/**
 * @generated SignedSource<<8a795dde2ad8c923be3cd10fbaecd70e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorMutationsProductQuery$variables = {
  id: string;
};
export type idErrorMutationsProductQuery$data = {
  readonly productById: {
    readonly id: string;
    readonly name: string | null;
  } | null;
};
export type idErrorMutationsProductQuery = {
  response: idErrorMutationsProductQuery$data;
  variables: idErrorMutationsProductQuery$variables;
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
    "name": "idErrorMutationsProductQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorMutationsProductQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "6588024366a0dd2d57e29c91196531f1",
    "id": null,
    "metadata": {},
    "name": "idErrorMutationsProductQuery",
    "operationKind": "query",
    "text": "query idErrorMutationsProductQuery(\n  $id: ID!\n) {\n  productById(id: $id) {\n    id\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "49419d86a99ece9379e493facfc2870a";

export default node;
