/**
 * @generated SignedSource<<4f9becc2291376d08226df11954b7842>>
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
export type idErrorGuardsRenameMutation$variables = {
  input: RenameProductInput;
};
export type idErrorGuardsRenameMutation$data = {
  readonly renameProduct: {
    readonly product: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type idErrorGuardsRenameMutation = {
  response: idErrorGuardsRenameMutation$data;
  variables: idErrorGuardsRenameMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
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
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorGuardsRenameMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorGuardsRenameMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "1b50e5d599f236912e2bfa8ae5f4437b",
    "id": null,
    "metadata": {},
    "name": "idErrorGuardsRenameMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorGuardsRenameMutation(\n  $input: RenameProductInput!\n) {\n  renameProduct(input: $input) {\n    product {\n      id @simulateError\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "28cff847566d8d459a59453faa0aa193";

export default node;
