/**
 * @generated SignedSource<<49cb3c4e296c97733c5e87683c6bd7c1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorQueriesRequiredQuery$variables = {
  err: boolean;
  id: string;
};
export type idErrorQueriesRequiredQuery$data = {
  readonly productById: {
    readonly id: string;
    readonly name: string | null;
  } | null;
};
export type idErrorQueriesRequiredQuery = {
  response: idErrorQueriesRequiredQuery$data;
  variables: idErrorQueriesRequiredQuery$variables;
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
  "name": "id"
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
    "name": "idErrorQueriesRequiredQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "productById",
        "plural": false,
        "selections": [
          {
            "kind": "RequiredField",
            "field": (v3/*:: as any*/),
            "action": "THROW"
          },
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*:: as any*/),
      (v0/*:: as any*/)
    ],
    "kind": "Operation",
    "name": "idErrorQueriesRequiredQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*:: as any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "productById",
        "plural": false,
        "selections": [
          (v3/*:: as any*/),
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a23e2aeeb03cf4ba9383715f8076f04d",
    "id": null,
    "metadata": {},
    "name": "idErrorQueriesRequiredQuery",
    "operationKind": "query",
    "text": "query idErrorQueriesRequiredQuery(\n  $id: ID!\n  $err: Boolean!\n) {\n  productById(id: $id) {\n    id @simulateError(if: $err)\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "3478f806fc3f142601fe42495ab9f708";

export default node;
