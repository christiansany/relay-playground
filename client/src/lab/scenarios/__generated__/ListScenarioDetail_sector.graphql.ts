/**
 * @generated SignedSource<<d6fada61a33a65e0244606d0a13b0344>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListScenarioDetail_sector$data = {
  readonly __id: string;
  readonly id: string;
  readonly name: string | null;
  readonly slug: string | null;
  readonly " $fragmentType": "ListScenarioDetail_sector";
};
export type ListScenarioDetail_sector$key = {
  readonly " $data"?: ListScenarioDetail_sector$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListScenarioDetail_sector">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListScenarioDetail_sector",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__id",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "Sector",
  "abstractKey": null
};

(node as any).hash = "07834a58559fe4f45563d79698c53f68";

export default node;
