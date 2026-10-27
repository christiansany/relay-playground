/**
 * @generated SignedSource<<631d7db3e2d55ad531baa2bfb9e7194c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LabListOrder = "DEFAULT" | "REVERSED";
export type idErrorListsSetOrderMutation$variables = {
  order: LabListOrder;
};
export type idErrorListsSetOrderMutation$data = {
  readonly labSetSectorOrder: boolean | null;
};
export type idErrorListsSetOrderMutation = {
  response: idErrorListsSetOrderMutation$data;
  variables: idErrorListsSetOrderMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "order"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "order",
        "variableName": "order"
      }
    ],
    "kind": "ScalarField",
    "name": "labSetSectorOrder",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorListsSetOrderMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorListsSetOrderMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "30a654df15ad941775362a621f62ac51",
    "id": null,
    "metadata": {},
    "name": "idErrorListsSetOrderMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorListsSetOrderMutation(\n  $order: LabListOrder!\n) {\n  labSetSectorOrder(order: $order)\n}\n"
  }
};
})();

(node as any).hash = "7f687948d41aa970c3438b94ab814b91";

export default node;
