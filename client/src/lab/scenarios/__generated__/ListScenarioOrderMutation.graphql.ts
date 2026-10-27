/**
 * @generated SignedSource<<f20df569c0d93b87cabae12ac6301231>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LabListOrder = "DEFAULT" | "REVERSED";
export type ListScenarioOrderMutation$variables = {
  order: LabListOrder;
};
export type ListScenarioOrderMutation$data = {
  readonly labSetSectorOrder: boolean | null;
};
export type ListScenarioOrderMutation = {
  response: ListScenarioOrderMutation$data;
  variables: ListScenarioOrderMutation$variables;
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
    "name": "ListScenarioOrderMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "ListScenarioOrderMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "90dee42823377b5b119a13059d471223",
    "id": null,
    "metadata": {},
    "name": "ListScenarioOrderMutation",
    "operationKind": "mutation",
    "text": "mutation ListScenarioOrderMutation(\n  $order: LabListOrder!\n) {\n  labSetSectorOrder(order: $order)\n}\n"
  }
};
})();

(node as any).hash = "44eb8ac9d4cf1248a5e544f8d5b191b0";

export default node;
