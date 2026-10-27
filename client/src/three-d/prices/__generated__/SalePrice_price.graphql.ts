/**
 * @generated SignedSource<<40e0feef3414a7e858d795449d353586>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SalePrice_price$data = {
  readonly amount: number;
  readonly endsAt: string;
  readonly originalAmount: number;
  readonly " $fragmentType": "SalePrice_price";
};
export type SalePrice_price$key = {
  readonly " $data"?: SalePrice_price$data;
  readonly " $fragmentSpreads": FragmentRefs<"SalePrice_price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SalePrice_price",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "originalAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endsAt",
      "storageKey": null
    }
  ],
  "type": "SalePrice",
  "abstractKey": null
};

(node as any).hash = "071438d0e863faf9720359d7cb6b7d27";

export default node;
