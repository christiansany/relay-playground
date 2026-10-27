/**
 * @generated SignedSource<<7ada140e69b24e8404c75f1d9244fabd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { NormalizationSplitOperation } from 'relay-runtime';


const node: NormalizationSplitOperation = {
  "kind": "SplitOperation",
  "metadata": {},
  "name": "NonReactModuleDemo_specs$normalization",
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

(node as any).hash = "370d2382c5af7a4132255dd223e3e0ba";

export default node;
