/**
 * @generated SignedSource<<2b7aa671b38d0541b62c5987df31c03e>>
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
export type idErrorQueriesRenameMutation$variables = {
  input: RenameProductInput;
};
export type idErrorQueriesRenameMutation$data = {
  readonly renameProduct: {
    readonly product: {
      readonly id: string;
      readonly name: string | null;
    } | null;
  } | null;
};
export type idErrorQueriesRenameMutation = {
  response: idErrorQueriesRenameMutation$data;
  variables: idErrorQueriesRenameMutation$variables;
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
    "name": "idErrorQueriesRenameMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorQueriesRenameMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "bd07b557d3396a62a77c7fe0fd6d3c76",
    "id": null,
    "metadata": {},
    "name": "idErrorQueriesRenameMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorQueriesRenameMutation(\n  $input: RenameProductInput!\n) {\n  renameProduct(input: $input) {\n    product {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a98b0df9c494c18f8b97d22515c331ca";

export default node;
