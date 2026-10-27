/**
 * @generated SignedSource<<fa23efa803398cf4d20b065bb3602067>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EnergyLabelBadge_label$data = {
  readonly grade: string;
  readonly kwhPerYear: number;
  readonly " $fragmentType": "EnergyLabelBadge_label";
};
export type EnergyLabelBadge_label$key = {
  readonly " $data"?: EnergyLabelBadge_label$data;
  readonly " $fragmentSpreads": FragmentRefs<"EnergyLabelBadge_label">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EnergyLabelBadge_label",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "grade",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "kwhPerYear",
      "storageKey": null
    }
  ],
  "type": "EnergyLabel",
  "abstractKey": null
};

(node as any).hash = "7c64559312c7fc87e7c91d9dbe0a5f14";

export default node;
