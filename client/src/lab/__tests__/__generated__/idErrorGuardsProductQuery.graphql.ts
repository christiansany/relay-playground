/**
 * @generated SignedSource<<4b644198546e6ed8000891892d442bf5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorGuardsProductQuery$variables = {
  id: string;
  idErr: boolean;
  nameErr: boolean;
};
export type idErrorGuardsProductQuery$data = {
  readonly productById: {
    readonly id: string;
    readonly name: string | null;
    readonly price: number | null;
  } | null;
};
export type idErrorGuardsProductQuery = {
  response: idErrorGuardsProductQuery$data;
  variables: idErrorGuardsProductQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "idErr"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "nameErr"
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "price",
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
    "name": "idErrorGuardsProductQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorGuardsProductQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "d737d75a94cbdedc4b08a9a065d68357",
    "id": null,
    "metadata": {},
    "name": "idErrorGuardsProductQuery",
    "operationKind": "query",
    "text": "query idErrorGuardsProductQuery(\n  $id: ID!\n  $idErr: Boolean!\n  $nameErr: Boolean!\n) {\n  productById(id: $id) {\n    id @simulateError(if: $idErr)\n    name @simulateError(if: $nameErr)\n    price\n  }\n}\n"
  }
};
})();

(node as any).hash = "43a274cf61bcc77a193ade9ca67a3938";

export default node;
