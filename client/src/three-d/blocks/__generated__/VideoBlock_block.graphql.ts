/**
 * @generated SignedSource<<09a703f6ac301ba2c2359c15683ec830>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VideoBlock_block$data = {
  readonly durationSeconds: number;
  readonly title: string;
  readonly videoUrl: string;
  readonly " $fragmentType": "VideoBlock_block";
};
export type VideoBlock_block$key = {
  readonly " $data"?: VideoBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"VideoBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "VideoBlock_block",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "videoUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "durationSeconds",
      "storageKey": null
    }
  ],
  "type": "VideoBlock",
  "abstractKey": null
};

(node as any).hash = "91ef877d01496e92b3c272c7ff8a2939";

export default node;
