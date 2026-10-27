/**
 * @generated SignedSource<<3c128d01bd214bd65d21e3cb952d305b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Server3DTextBlock_block$data = {
  readonly body: string;
  readonly heading: string;
  readonly " $fragmentType": "Server3DTextBlock_block";
};
export type Server3DTextBlock_block$key = {
  readonly " $data"?: Server3DTextBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"Server3DTextBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Server3DTextBlock_block",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "heading",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    }
  ],
  "type": "TextBlock",
  "abstractKey": null
};

(node as any).hash = "b237422c87d971628b7261eb7605a915";

export default node;
