/**
 * @generated SignedSource<<e63aeb048c9ff7e96d5a948d3d6ed3ec>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorHooks_throwingProducts$data = {
  readonly id: string;
  readonly products: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly name: string;
      };
    }>;
  };
  readonly " $fragmentType": "idErrorHooks_throwingProducts";
};
export type idErrorHooks_throwingProducts$key = {
  readonly " $data"?: idErrorHooks_throwingProducts$data;
  readonly " $fragmentSpreads": FragmentRefs<"idErrorHooks_throwingProducts">;
};

import idErrorHooksThrowingProductsPaginationQuery_graphql from './idErrorHooksThrowingProductsPaginationQuery.graphql';

const node: ReaderFragment = (function(){
var v0 = [
  "products"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 2,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*:: as any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*:: as any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": idErrorHooksThrowingProductsPaginationQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    },
    "throwOnFieldError": true
  },
  "name": "idErrorHooks_throwingProducts",
  "selections": [
    {
      "alias": "products",
      "args": null,
      "concreteType": "ProductConnection",
      "kind": "LinkedField",
      "name": "__idErrorHooksThrowing_products_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ProductEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
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
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
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
  "type": "ProductType",
  "abstractKey": null
};
})();

(node as any).hash = "861883c41a9d0cd5ae56d412cd7acb00";

export default node;
