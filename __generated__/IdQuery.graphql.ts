/**
 * @generated SignedSource<<b5ef51d95b53be8515790930758b9b47>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IdQuery$variables = {
  id: string;
};
export type IdQuery$data = {
  readonly product: {
    readonly " $fragmentSpreads": FragmentRefs<"IdProductDescription" | "IdProductName">;
  } | null | undefined;
};
export type IdQuery = {
  response: IdQuery$data;
  variables: IdQuery$variables;
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IdQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "product",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "IdProductName"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "IdProductDescription"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IdQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Product",
        "kind": "LinkedField",
        "name": "product",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8a4fcb88a24976d756254f643e7421ff",
    "id": null,
    "metadata": {},
    "name": "IdQuery",
    "operationKind": "query",
    "text": "query IdQuery(\n  $id: ID!\n) {\n  product(id: $id) {\n    ...IdProductName\n    ...IdProductDescription\n    id\n  }\n}\n\nfragment IdProductDescription on Product {\n  description\n}\n\nfragment IdProductName on Product {\n  name\n}\n"
  }
};
})();

(node as any).hash = "7743053dd5fc535fcf0b799df307260f";

export default node;
