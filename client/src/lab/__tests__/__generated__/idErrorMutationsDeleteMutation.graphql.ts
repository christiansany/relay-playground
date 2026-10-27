/**
 * @generated SignedSource<<572cf966aab9e8a58908e1b6359b854f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteProductInput = {
  id: string;
};
export type idErrorMutationsDeleteMutation$variables = {
  connections: ReadonlyArray<string>;
  err: boolean;
  input: DeleteProductInput;
};
export type idErrorMutationsDeleteMutation$data = {
  readonly deleteProduct: {
    readonly deletedProductId: string;
  } | null;
};
export type idErrorMutationsDeleteMutation = {
  response: idErrorMutationsDeleteMutation$data;
  variables: idErrorMutationsDeleteMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "err"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "deletedProductId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/),
      (v2/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorMutationsDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*:: as any*/),
        "concreteType": "DeleteProductPayload",
        "kind": "LinkedField",
        "name": "deleteProduct",
        "plural": false,
        "selections": [
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*:: as any*/),
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "idErrorMutationsDeleteMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*:: as any*/),
        "concreteType": "DeleteProductPayload",
        "kind": "LinkedField",
        "name": "deleteProduct",
        "plural": false,
        "selections": [
          (v4/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteRecord",
            "key": "",
            "kind": "ScalarHandle",
            "name": "deletedProductId"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "296c8888e657a9e2f370c81c4a386b3b",
    "id": null,
    "metadata": {},
    "name": "idErrorMutationsDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorMutationsDeleteMutation(\n  $input: DeleteProductInput!\n  $err: Boolean!\n) {\n  deleteProduct(input: $input) {\n    deletedProductId @simulateError(if: $err)\n  }\n}\n"
  }
};
})();

(node as any).hash = "e7565eabef39a0fb3d468970f2350d0f";

export default node;
