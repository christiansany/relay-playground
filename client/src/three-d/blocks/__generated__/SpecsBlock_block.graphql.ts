/**
 * @generated SignedSource<<8cc152013f6b8cb272c0a00bbeb03d1b>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpecsBlock_block$data = {
  readonly specs: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
  }>;
  readonly " $fragmentType": "SpecsBlock_block";
};
export type SpecsBlock_block$key = {
  readonly " $data"?: SpecsBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpecsBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpecsBlock_block",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Spec",
      "kind": "LinkedField",
      "name": "specs",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "label",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SpecsBlock",
  "abstractKey": null
};

(node as any).hash = "22b2605cd0cb27970bdd685e7300ccb9";

export default node;
