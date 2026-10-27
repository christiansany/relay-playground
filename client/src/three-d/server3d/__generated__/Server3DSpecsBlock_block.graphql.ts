/**
 * @generated SignedSource<<253718d9fec0b87a96f3651479d2208f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Server3DSpecsBlock_block$data = {
  readonly specs: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
  }>;
  readonly " $fragmentType": "Server3DSpecsBlock_block";
};
export type Server3DSpecsBlock_block$key = {
  readonly " $data"?: Server3DSpecsBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"Server3DSpecsBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Server3DSpecsBlock_block",
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

(node as any).hash = "0556d2dd9b51e6a5d2fe0179c8ea286b";

export default node;
