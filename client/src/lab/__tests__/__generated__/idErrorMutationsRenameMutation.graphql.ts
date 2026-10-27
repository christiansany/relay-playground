/**
 * @generated SignedSource<<9567c7308e45112708776a9d18729fc1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type RenameProductInput = {
  id: string;
  name: string;
};
export type idErrorMutationsRenameMutation$variables = {
  err: boolean;
  input: RenameProductInput;
};
export type idErrorMutationsRenameMutation$data = {
  readonly renameProduct: {
    readonly product: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type idErrorMutationsRenameMutation = {
  response: idErrorMutationsRenameMutation$data;
  variables: idErrorMutationsRenameMutation$variables;
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
  "name": "input"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "RenameProductPayload",
    "kind": "LinkedField",
    "name": "renameProduct",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "product",
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
    "name": "idErrorMutationsRenameMutation",
    "selections": (v2/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "idErrorMutationsRenameMutation",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "61faf6ede25f18f1301cc250febf8123",
    "id": null,
    "metadata": {},
    "name": "idErrorMutationsRenameMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorMutationsRenameMutation(\n  $input: RenameProductInput!\n  $err: Boolean!\n) {\n  renameProduct(input: $input) {\n    product {\n      id @simulateError(if: $err)\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "61bacf2c00f54ce53fb986bc6a9b1c76";

export default node;
