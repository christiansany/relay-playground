/**
 * @generated SignedSource<<10d84497e2955a90eef5f4611a457b4a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorHooksProductTypeRefetchQuery$variables = {
  id: string;
};
export type idErrorHooksProductTypeRefetchQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"idErrorHooks_productType">;
  } | null;
};
export type idErrorHooksProductTypeRefetchQuery = {
  response: idErrorHooksProductTypeRefetchQuery$data;
  variables: idErrorHooksProductTypeRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorHooksProductTypeRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "idErrorHooks_productType"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorHooksProductTypeRefetchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "type": "ProductType",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bbbbee70dc222691a600642d2a874fe4",
    "id": null,
    "metadata": {},
    "name": "idErrorHooksProductTypeRefetchQuery",
    "operationKind": "query",
    "text": "query idErrorHooksProductTypeRefetchQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...idErrorHooks_productType\n    id\n  }\n}\n\nfragment idErrorHooks_productType on ProductType {\n  name\n  id\n}\n"
  }
};
})();

(node as any).hash = "88cdc5809b8d16d71e8f3f98525ecfdf";

export default node;
