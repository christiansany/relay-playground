/**
 * @generated SignedSource<<0570e88f6196da058accc2e57ea7f703>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { NormalizationSplitOperation } from 'relay-runtime';


const node: NormalizationSplitOperation = {
  "kind": "SplitOperation",
  "metadata": {},
  "name": "Server3DSpecsBlock_block$normalization",
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
  ]
};

(node as any).hash = "0556d2dd9b51e6a5d2fe0179c8ea286b";

export default node;
