/**
 * @generated SignedSource<<f77de38cb4f0c6e227bf4321a63b9091>>
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
export type MutationScenarioRenameMutation$variables = {
  err: boolean;
  input: RenameProductInput;
};
export type MutationScenarioRenameMutation$data = {
  readonly renameProduct: {
    readonly product: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type MutationScenarioRenameMutation = {
  response: MutationScenarioRenameMutation$data;
  variables: MutationScenarioRenameMutation$variables;
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
    "name": "MutationScenarioRenameMutation",
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
    "name": "MutationScenarioRenameMutation",
    "selections": (v2/*:: as any*/)
  },
  "params": {
    "cacheID": "db717203299079cffafd2968c9c9f424",
    "id": null,
    "metadata": {},
    "name": "MutationScenarioRenameMutation",
    "operationKind": "mutation",
    "text": "mutation MutationScenarioRenameMutation(\n  $input: RenameProductInput!\n  $err: Boolean!\n) {\n  renameProduct(input: $input) {\n    product {\n      id @simulateError(if: $err)\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1a27473584ecdd3de739af6df3095a0c";

export default node;
