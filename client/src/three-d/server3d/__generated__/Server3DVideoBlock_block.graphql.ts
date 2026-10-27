/**
 * @generated SignedSource<<92c40989351c4fbb07f0112c78f8a538>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Server3DVideoBlock_block$data = {
  readonly title: string;
  readonly videoUrl: string;
  readonly " $fragmentType": "Server3DVideoBlock_block";
};
export type Server3DVideoBlock_block$key = {
  readonly " $data"?: Server3DVideoBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"Server3DVideoBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Server3DVideoBlock_block",
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
    }
  ],
  "type": "VideoBlock",
  "abstractKey": null
};

(node as any).hash = "eb85149647b5fadaf090f99268ae3352";

export default node;
