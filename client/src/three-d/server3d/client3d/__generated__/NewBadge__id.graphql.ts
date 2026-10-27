/**
 * @generated SignedSource<<4e4ac260c48b8d059bc78d54e1ae93d1>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewBadge__id$data = {
  readonly id: string;
  readonly " $fragmentType": "NewBadge__id";
};
export type NewBadge__id$key = {
  readonly " $data"?: NewBadge__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewBadge__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewBadge__id",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "NewBadge",
  "abstractKey": null
};

export default node;
