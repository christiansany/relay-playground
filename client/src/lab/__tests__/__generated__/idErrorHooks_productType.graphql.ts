/**
 * @generated SignedSource<<b962b76d19da22749c83646153b731fd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorHooks_productType$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "idErrorHooks_productType";
};
export type idErrorHooks_productType$key = {
  readonly " $data"?: idErrorHooks_productType$data;
  readonly " $fragmentSpreads": FragmentRefs<"idErrorHooks_productType">;
};

import idErrorHooksProductTypeRefetchQuery_graphql from './idErrorHooksProductTypeRefetchQuery.graphql';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [
        "node"
      ],
      "operation": idErrorHooksProductTypeRefetchQuery_graphql,
      "identifierInfo": {
        "identifierField": "id",
        "identifierQueryVariableName": "id"
      }
    },
    "throwOnFieldError": true
  },
  "name": "idErrorHooks_productType",
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
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ProductType",
  "abstractKey": null
};

(node as any).hash = "88cdc5809b8d16d71e8f3f98525ecfdf";

export default node;
