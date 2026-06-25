/**
 * @generated SignedSource<<58bd806e1eefcfae05da692b6432c9cc>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SectorSlugQuery$variables = {
  sectorSlug: string;
};
export type SectorSlugQuery$data = {
  readonly sectorBySlug: {
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"SectorProductTypesSection_sector" | "SectorProductsSection_sector">;
  } | null;
};
export type SectorSlugQuery = {
  response: SectorSlugQuery$data;
  variables: SectorSlugQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sectorSlug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "sectorSlug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "SectorSlugQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Sector",
        "kind": "LinkedField",
        "name": "sectorBySlug",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SectorProductTypesSection_sector"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SectorProductsSection_sector"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "SectorSlugQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "Sector",
        "kind": "LinkedField",
        "name": "sectorBySlug",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          (v3/*:: as any*/),
          (v4/*:: as any*/),
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
                      (v2/*:: as any*/),
                      (v4/*:: as any*/),
                      (v3/*:: as any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "productTypes(first:50)"
          },
          {
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
                      (v2/*:: as any*/),
                      (v3/*:: as any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8b520c9e6e26ed07e2acc50bb4e8c045",
    "id": null,
    "metadata": {},
    "name": "SectorSlugQuery",
    "operationKind": "query",
    "text": "query SectorSlugQuery(\n  $sectorSlug: String!\n) {\n  sectorBySlug(slug: $sectorSlug) {\n    id\n    name\n    ...SectorProductTypesSection_sector\n    ...SectorProductsSection_sector\n  }\n}\n\nfragment SectorProductTypesSection_sector on Sector {\n  slug\n  productTypes(first: 50) {\n    edges {\n      node {\n        id\n        slug\n        name\n      }\n    }\n  }\n}\n\nfragment SectorProductsSection_sector on Sector {\n  id\n  name\n  products(first: 20) {\n    edges {\n      node {\n        id\n        name\n        price\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4b5a01b1de5d22ebc353a6a57eee216a";

export default node;
