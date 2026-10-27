/**
 * @generated SignedSource<<b037f12b990eac27520f4c1483750a03>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorGuards_sector$data = {
  readonly name: string | null;
  readonly " $fragmentType": "idErrorGuards_sector";
};
export type idErrorGuards_sector$key = {
  readonly " $data"?: idErrorGuards_sector$data;
  readonly " $fragmentSpreads": FragmentRefs<"idErrorGuards_sector">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "idErrorGuards_sector",
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

(node as any).hash = "bb4ff1c4f096cdd78913b12afee9a280";

export default node;
