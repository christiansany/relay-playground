/**
 * @generated SignedSource<<026bcf48a38b53ed8d3668e482dea5ea>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegularPrice_price$data = {
  readonly amount: number;
  readonly " $fragmentType": "RegularPrice_price";
};
export type RegularPrice_price$key = {
  readonly " $data"?: RegularPrice_price$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegularPrice_price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegularPrice_price",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    }
  ],
  "type": "RegularPrice",
  "abstractKey": null
};

(node as any).hash = "134ea7496713640de62a182f7ccb0393";

export default node;
