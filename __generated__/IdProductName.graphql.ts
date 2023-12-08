/**
 * @generated SignedSource<<54f3009ebd67a2a6163ff85e7c986697>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IdProductName$data = {
  readonly name: string;
  readonly " $fragmentType": "IdProductName";
};
export type IdProductName$key = {
  readonly " $data"?: IdProductName$data;
  readonly " $fragmentSpreads": FragmentRefs<"IdProductName">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IdProductName",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "73972d4bb12bb3e4f1232f416affb634";

export default node;
