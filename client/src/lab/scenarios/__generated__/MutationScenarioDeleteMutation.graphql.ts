/**
 * @generated SignedSource<<3f391df680b9387448b5ce086acf4b13>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type DeleteProductInput = {
  id: string;
};
export type MutationScenarioDeleteMutation$variables = {
  connections: ReadonlyArray<string>;
  err: boolean;
  input: DeleteProductInput;
};
export type MutationScenarioDeleteMutation$data = {
  readonly deleteProduct: {
    readonly deletedId: string;
    readonly deletedProductId: string;
  } | null;
};
export type MutationScenarioDeleteMutation = {
  response: MutationScenarioDeleteMutation$data;
  variables: MutationScenarioDeleteMutation$variables;
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
},
v5 = {
  "alias": "deletedId",
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
    "name": "MutationScenarioDeleteMutation",
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
          (v5/*:: as any*/)
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
    "name": "MutationScenarioDeleteMutation",
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
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "deletedProductId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          },
          (v5/*:: as any*/),
          {
            "alias": "deletedId",
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
    "cacheID": "236a0ecfb18526e56eec5a7b16a60543",
    "id": null,
    "metadata": {},
    "name": "MutationScenarioDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation MutationScenarioDeleteMutation(\n  $input: DeleteProductInput!\n  $err: Boolean!\n) {\n  deleteProduct(input: $input) {\n    deletedProductId @simulateError(if: $err)\n    deletedId: deletedProductId @simulateError(if: $err)\n  }\n}\n"
  }
};
})();

(node as any).hash = "31328285d063374879a26d2b4cd50a67";

export default node;
