/**
 * @generated SignedSource<<7b72c450be231611906a6dac61a26ecd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { Result } from "relay-runtime";
export type idErrorQueriesCatchQuery$variables = {
  err: boolean;
  id: string;
};
export type idErrorQueriesCatchQuery$data = {
  readonly productById: Result<{
    readonly id: Result<string, unknown>;
    readonly name: string;
  } | null, unknown>;
};
export type idErrorQueriesCatchQuery = {
  response: idErrorQueriesCatchQuery$data;
  variables: idErrorQueriesCatchQuery$variables;
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
    "name": "idErrorQueriesCatchQuery",
    "selections": [
      {
        "kind": "CatchField",
        "field": {
          "alias": null,
          "args": (v2/*:: as any*/),
          "concreteType": "Product",
          "kind": "LinkedField",
          "name": "productById",
          "plural": false,
          "selections": [
            {
              "kind": "CatchField",
              "field": (v3/*:: as any*/),
              "to": "RESULT"
            },
            (v4/*:: as any*/)
          ],
          "storageKey": null
        },
        "to": "RESULT"
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
    "name": "idErrorQueriesCatchQuery",
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
    "cacheID": "ef1f72694071d4b92bd29b2ac187e25a",
    "id": null,
    "metadata": {},
    "name": "idErrorQueriesCatchQuery",
    "operationKind": "query",
    "text": "query idErrorQueriesCatchQuery(\n  $id: ID!\n  $err: Boolean!\n) {\n  productById(id: $id) {\n    id @simulateError(if: $err)\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "e0de1e1762c42410f9d9645eee0e449e";

export default node;
