/**
 * @generated SignedSource<<4eceff06e2fe94a25aa5de2873379653>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { NormalizationSplitOperation } from 'relay-runtime';


const node: NormalizationSplitOperation = {
  "kind": "SplitOperation",
  "metadata": {},
  "name": "NewBadgeView_badge$normalization",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "name": "since",
          "args": null,
          "fragment": {
            "kind": "InlineFragment",
            "selections": [
              {
                "name": "__relay_model_instance",
                "args": null,
                "fragment": {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    }
                  ],
                  "type": "NewBadge",
                  "abstractKey": null
                },
                "kind": "RelayResolver",
                "storageKey": null,
                "isOutputType": false
              }
            ],
            "type": "NewBadge",
            "abstractKey": null
          },
          "kind": "RelayResolver",
          "storageKey": null,
          "isOutputType": true
        }
      ]
    }
  ]
};

(node as any).hash = "d9fc188d837d834dc0977ece86791072";

export default node;
