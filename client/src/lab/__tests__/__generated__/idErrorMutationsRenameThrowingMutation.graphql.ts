/**
 * @generated SignedSource<<325ab611d502b03b0264df0ad9c3b5e5>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RenameProductInput = {
  id: string;
  name: string;
};
export type idErrorMutationsRenameThrowingMutation$variables = {
  err: boolean;
  input: RenameProductInput;
};
export type idErrorMutationsRenameThrowingMutation$data = {
  readonly renameProduct: {
    readonly product: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"idErrorMutations_renamedProduct">;
    } | null;
  } | null;
};
export type idErrorMutationsRenameThrowingMutation = {
  response: idErrorMutationsRenameThrowingMutation$data;
  variables: idErrorMutationsRenameThrowingMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*:: as any*/),
      (v1/*:: as any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorMutationsRenameThrowingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
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
              (v3/*:: as any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "idErrorMutations_renamedProduct"
              }
            ],
            "storageKey": null
          }
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
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "idErrorMutationsRenameThrowingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
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
              (v3/*:: as any*/),
              (v3/*:: as any*/),
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
    ]
  },
  "params": {
    "cacheID": "5b0dcb390733ce97d2e1ef76df985462",
    "id": null,
    "metadata": {},
    "name": "idErrorMutationsRenameThrowingMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorMutationsRenameThrowingMutation(\n  $input: RenameProductInput!\n  $err: Boolean!\n) {\n  renameProduct(input: $input) {\n    product {\n      id @simulateError(if: $err)\n      ...idErrorMutations_renamedProduct\n    }\n  }\n}\n\nfragment idErrorMutations_renamedProduct on Product {\n  id\n  name\n}\n"
  }
};
})();

(node as any).hash = "6b13a150a00bd464e7d9681cf88a93f6";

export default node;
