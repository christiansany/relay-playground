/**
 * @generated SignedSource<<d707ccc60043c3d7249c79120748467e>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ImageGalleryBlock_block$data = {
  readonly images: ReadonlyArray<{
    readonly alt: string;
    readonly url: string;
  }>;
  readonly " $fragmentType": "ImageGalleryBlock_block";
};
export type ImageGalleryBlock_block$key = {
  readonly " $data"?: ImageGalleryBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"ImageGalleryBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ImageGalleryBlock_block",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "url",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "alt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ImageGalleryBlock",
  "abstractKey": null
};

(node as any).hash = "ea55d7cdf170fc1f9f440032b14f4da0";

export default node;
