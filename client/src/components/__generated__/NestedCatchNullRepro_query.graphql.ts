/**
 * @generated SignedSource<<b8fdba52511e6284a81dd3d3e743a79d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NestedCatchNullRepro_query$data = {
  readonly sectors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
      };
    }>;
  } | null;
  readonly " $fragmentType": "NestedCatchNullRepro_query";
} | null;
export type NestedCatchNullRepro_query$key = {
  readonly " $data"?: NestedCatchNullRepro_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"NestedCatchNullRepro_query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "catchTo": "NULL"
  },
  "name": "NestedCatchNullRepro_query",
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
      "to": "NULL"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "42d1d128a3a928a7a50d0e10079d7467";

export default node;
