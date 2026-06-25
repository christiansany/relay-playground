/**
 * @generated SignedSource<<07d31e354625c6723a72f07e80059a5a>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SectorProductTypesSection_sector$data = {
  readonly productTypes: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly slug: string;
      };
    }>;
  };
  readonly slug: string;
  readonly " $fragmentType": "SectorProductTypesSection_sector";
};
export type SectorProductTypesSection_sector$key = {
  readonly " $data"?: SectorProductTypesSection_sector$data;
  readonly " $fragmentSpreads": FragmentRefs<"SectorProductTypesSection_sector">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "SectorProductTypesSection_sector",
  "selections": [
    (v0/*:: as any*/),
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        }
      ],
      "concreteType": "ProductTypeConnection",
      "kind": "LinkedField",
      "name": "productTypes",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ProductTypeEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "ProductType",
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
                (v0/*:: as any*/),
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
      "storageKey": "productTypes(first:50)"
    }
  ],
  "type": "Sector",
  "abstractKey": null
};
})();

(node as any).hash = "938769b3d2c408228a0a251a0e6b9949";

export default node;
