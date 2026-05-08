/**
 * @generated SignedSource<<f49a849da2595674608b285e4a2e35a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SectorSlugQuery$variables = {
  sectorSlug: string;
};
export type SectorSlugQuery$data = {
  readonly sectorBySlug: {
    readonly id: string;
    readonly name: string;
    readonly productTypes: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly name: string;
          readonly slug: string;
        };
      }>;
    };
  } | null | undefined;
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "slug",
        "variableName": "sectorSlug"
      }
    ],
    "concreteType": "Sector",
    "kind": "LinkedField",
    "name": "sectorBySlug",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      (v2/*: any*/),
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v2/*: any*/)
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SectorSlugQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SectorSlugQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "25ac271fe1728017d9a5955961c29eac",
    "id": null,
    "metadata": {},
    "name": "SectorSlugQuery",
    "operationKind": "query",
    "text": "query SectorSlugQuery(\n  $sectorSlug: String!\n) {\n  sectorBySlug(slug: $sectorSlug) {\n    id\n    name\n    productTypes(first: 50) {\n      edges {\n        node {\n          id\n          slug\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6de0411498437bb34d0c77b5598ccb1b";

export default node;
