/**
 * @generated SignedSource<<4e865cf55feff6494fd086ddbdb14ee1>>
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
export type idErrorHooksRenameMutation$variables = {
  input: RenameProductInput;
};
export type idErrorHooksRenameMutation$data = {
  readonly renameProduct: {
    readonly product: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type idErrorHooksRenameMutation = {
  response: idErrorHooksRenameMutation$data;
  variables: idErrorHooksRenameMutation$variables;
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
    "name": "idErrorHooksRenameMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorHooksRenameMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "fcde017db8cc46b6667105d2590604f4",
    "id": null,
    "metadata": {},
    "name": "idErrorHooksRenameMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorHooksRenameMutation(\n  $input: RenameProductInput!\n) {\n  renameProduct(input: $input) {\n    product {\n      id @simulateError\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7392ce10a34dbb2c6cb8abc8e1d07055";

export default node;
