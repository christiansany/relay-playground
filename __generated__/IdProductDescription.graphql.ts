/**
 * @generated SignedSource<<e2abb89a72d2bb1447fc5b0827fa4e20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IdProductDescription$data = {
  readonly description: string;
  readonly " $fragmentType": "IdProductDescription";
};
export type IdProductDescription$key = {
  readonly " $data"?: IdProductDescription$data;
  readonly " $fragmentSpreads": FragmentRefs<"IdProductDescription">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IdProductDescription",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "f179b4fd45e8ed276f3be8a0a3f078f6";

export default node;
