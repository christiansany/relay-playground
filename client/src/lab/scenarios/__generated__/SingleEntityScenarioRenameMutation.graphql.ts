/**
 * @generated SignedSource<<f76f26b5fb047b441cd2b12bd10947a9>>
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
export type SingleEntityScenarioRenameMutation$variables = {
  input: RenameProductInput;
};
export type SingleEntityScenarioRenameMutation$data = {
  readonly renameProduct: {
    readonly product: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type SingleEntityScenarioRenameMutation = {
  response: SingleEntityScenarioRenameMutation$data;
  variables: SingleEntityScenarioRenameMutation$variables;
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
    "name": "SingleEntityScenarioRenameMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "SingleEntityScenarioRenameMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "e022edcf45a1765f33677be621eae665",
    "id": null,
    "metadata": {},
    "name": "SingleEntityScenarioRenameMutation",
    "operationKind": "mutation",
    "text": "mutation SingleEntityScenarioRenameMutation(\n  $input: RenameProductInput!\n) {\n  renameProduct(input: $input) {\n    product {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e8c6cbb8028ac77ab6e55161c9ebbb3f";

export default node;
