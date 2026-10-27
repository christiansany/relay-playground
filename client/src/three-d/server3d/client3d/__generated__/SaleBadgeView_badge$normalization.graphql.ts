/**
 * @generated SignedSource<<4f274425f4102980a639c65151ad18d6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { NormalizationSplitOperation } from 'relay-runtime';


const node: NormalizationSplitOperation = {
  "kind": "SplitOperation",
  "metadata": {},
  "name": "SaleBadgeView_badge$normalization",
  "selections": [
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "name": "discountLabel",
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
                  "type": "SaleBadge",
                  "abstractKey": null
                },
                "kind": "RelayResolver",
                "storageKey": null,
                "isOutputType": false
              }
            ],
            "type": "SaleBadge",
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

(node as any).hash = "bb449315bc6b1c42d0e9e0a7dcf17172";

export default node;
