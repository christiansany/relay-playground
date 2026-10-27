/**
 * @generated SignedSource<<4210f52f4c07c3aa0d46f3b7723fd6ca>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BundlePrice_price$data = {
  readonly amount: number;
  readonly bundleItems: ReadonlyArray<string>;
  readonly " $fragmentType": "BundlePrice_price";
};
export type BundlePrice_price$key = {
  readonly " $data"?: BundlePrice_price$data;
  readonly " $fragmentSpreads": FragmentRefs<"BundlePrice_price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BundlePrice_price",
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
      "name": "bundleItems",
      "storageKey": null
    }
  ],
  "type": "BundlePrice",
  "abstractKey": null
};

(node as any).hash = "5bb44fe0aff5400a8eb99c93f592bc02";

export default node;
