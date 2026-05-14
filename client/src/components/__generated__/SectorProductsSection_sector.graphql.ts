/**
 * @generated SignedSource<<4f773be4248bfc0a10f1d16328b84d63>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs, Result } from "relay-runtime";
export type SectorProductsSection_sector$data = Result<{
  readonly id: string;
  readonly name: string;
  readonly products: Result<{
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly price: number;
      };
    }>;
  }, unknown>;
  readonly " $fragmentType": "SectorProductsSection_sector";
}, unknown>;
export type SectorProductsSection_sector$key = {
  readonly " $data"?: SectorProductsSection_sector$data;
  readonly " $fragmentSpreads": FragmentRefs<"SectorProductsSection_sector">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "catchTo": "RESULT"
  },
  "name": "SectorProductsSection_sector",
  "selections": [
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "kind": "CatchField",
      "field": {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "first",
            "value": 20
          }
        ],
        "concreteType": "ProductConnection",
        "kind": "LinkedField",
        "name": "products",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ProductEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Product",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "price",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "products(first:20)"
      },
      "to": "RESULT"
    }
  ],
  "type": "Sector",
  "abstractKey": null
};
})();

(node as any).hash = "cdd0eb6098a91307467fda2922acdf71";

export default node;
