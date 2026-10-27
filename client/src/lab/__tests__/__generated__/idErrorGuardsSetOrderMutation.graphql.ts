/**
 * @generated SignedSource<<42132a1ec22149693b9a6d02446369ca>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type LabListOrder = "DEFAULT" | "REVERSED";
export type idErrorGuardsSetOrderMutation$variables = {
  order: LabListOrder;
};
export type idErrorGuardsSetOrderMutation$data = {
  readonly labSetSectorOrder: boolean | null;
};
export type idErrorGuardsSetOrderMutation = {
  response: idErrorGuardsSetOrderMutation$data;
  variables: idErrorGuardsSetOrderMutation$variables;
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
    "name": "idErrorGuardsSetOrderMutation",
    "selections": (v1/*:: as any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorGuardsSetOrderMutation",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "64559fa3556d8791c2b1e7cb90eea3bc",
    "id": null,
    "metadata": {},
    "name": "idErrorGuardsSetOrderMutation",
    "operationKind": "mutation",
    "text": "mutation idErrorGuardsSetOrderMutation(\n  $order: LabListOrder!\n) {\n  labSetSectorOrder(order: $order)\n}\n"
  }
};
})();

(node as any).hash = "961c995be1b05a8bbca8a4478c269159";

export default node;
