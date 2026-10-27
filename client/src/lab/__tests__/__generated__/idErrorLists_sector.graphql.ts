/**
 * @generated SignedSource<<1234be4055e68f26c7b0baff7a5e77ca>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorLists_sector$data = {
  readonly name: string | null;
  readonly " $fragmentType": "idErrorLists_sector";
};
export type idErrorLists_sector$key = {
  readonly " $data"?: idErrorLists_sector$data;
  readonly " $fragmentSpreads": FragmentRefs<"idErrorLists_sector">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "idErrorLists_sector",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Sector",
  "abstractKey": null
};

(node as any).hash = "8f5cb64289b4e0a2e0cdfd53d34ef26b";

export default node;
