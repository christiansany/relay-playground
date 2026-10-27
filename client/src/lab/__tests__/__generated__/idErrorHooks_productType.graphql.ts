/**
 * @generated SignedSource<<4ac198a3fa84365eecd5469167716d77>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorHooks_productType$data = {
  readonly id: string;
  readonly name: string | null;
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
    }
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

(node as any).hash = "7c856e305a218012be6f3446f7b8df31";

export default node;
