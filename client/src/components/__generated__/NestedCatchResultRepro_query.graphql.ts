/**
 * @generated SignedSource<<ec96bbd0dca639d7cb90161414eef0e3>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs, Result } from "relay-runtime";
export type NestedCatchResultRepro_query$data = Result<{
  readonly sectors: Result<{
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }>;
  }, unknown>;
  readonly " $fragmentType": "NestedCatchResultRepro_query";
}, unknown>;
export type NestedCatchResultRepro_query$key = {
  readonly " $data"?: NestedCatchResultRepro_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"NestedCatchResultRepro_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "catchTo": "RESULT"
  },
  "name": "NestedCatchResultRepro_query",
  "selections": [
    {
      "kind": "CatchField",
      "field": {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 1
          }
        ],
        "concreteType": "SectorConnection",
        "kind": "LinkedField",
        "name": "sectors",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SectorEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Sector",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
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
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "sectors(first:1)"
      },
      "to": "RESULT"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9057381c8268c5d91da17b34d5b8ff34";

export default node;
