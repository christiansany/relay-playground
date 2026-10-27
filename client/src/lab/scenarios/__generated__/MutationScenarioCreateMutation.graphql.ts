/**
 * @generated SignedSource<<7daff532d9361108019666ff6a57602e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CreateProductInput = {
  name: string;
  price: number;
  productTypeId: string;
};
export type MutationScenarioCreateMutation$variables = {
  connections: ReadonlyArray<string>;
  err: boolean;
  input: CreateProductInput;
};
export type MutationScenarioCreateMutation$data = {
  readonly createProduct: {
    readonly productEdge: {
      readonly cursor: string | null;
      readonly node: {
        readonly id: string;
        readonly name: string | null;
      } | null;
    } | null;
  } | null;
};
export type MutationScenarioCreateMutation = {
  response: MutationScenarioCreateMutation$data;
  variables: MutationScenarioCreateMutation$variables;
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
  "concreteType": "ProductEdge",
  "kind": "LinkedField",
  "name": "productEdge",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Product",
      "kind": "LinkedField",
      "name": "node",
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
    "name": "MutationScenarioCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*:: as any*/),
        "concreteType": "CreateProductPayload",
        "kind": "LinkedField",
        "name": "createProduct",
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
    "name": "MutationScenarioCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v3/*:: as any*/),
        "concreteType": "CreateProductPayload",
        "kind": "LinkedField",
        "name": "createProduct",
        "plural": false,
        "selections": [
          (v4/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendEdge",
            "key": "",
            "kind": "LinkedHandle",
            "name": "productEdge",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "07b211d18586d16173f9243b10bfb3b1",
    "id": null,
    "metadata": {},
    "name": "MutationScenarioCreateMutation",
    "operationKind": "mutation",
    "text": "mutation MutationScenarioCreateMutation(\n  $input: CreateProductInput!\n  $err: Boolean!\n) {\n  createProduct(input: $input) {\n    productEdge {\n      cursor\n      node {\n        id @simulateError(if: $err)\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "186cc9840e47b3d85330e814b006da6d";

export default node;
