/**
 * @generated SignedSource<<d9490b1b656f25ef1cc69ccef22b1f7a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TextBlock_block$data = {
  readonly body: string;
  readonly heading: string;
  readonly " $fragmentType": "TextBlock_block";
};
export type TextBlock_block$key = {
  readonly " $data"?: TextBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"TextBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TextBlock_block",
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

(node as any).hash = "b8b2d2662459eb3ae945f119810cd07c";

export default node;
