/**
 * @generated SignedSource<<aa7ae1bd7496e24f1b1ebba3fde5509f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleBadge__id$data = {
  readonly id: string;
  readonly " $fragmentType": "SaleBadge__id";
};
export type SaleBadge__id$key = {
  readonly " $data"?: SaleBadge__id$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleBadge__id">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleBadge__id",
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
  "type": "SaleBadge",
  "abstractKey": null
};

export default node;
