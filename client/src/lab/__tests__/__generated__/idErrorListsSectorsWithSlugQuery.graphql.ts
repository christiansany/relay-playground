/**
 * @generated SignedSource<<06589567c14e92708d765a4933ebd137>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorListsSectorsWithSlugQuery$variables = {
  errIds: ReadonlyArray<string>;
};
export type idErrorListsSectorsWithSlugQuery$data = {
  readonly sectors: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string | null;
        readonly slug: string | null;
      } | null;
    } | null> | null;
  } | null;
};
export type idErrorListsSectorsWithSlugQuery = {
  response: idErrorListsSectorsWithSlugQuery$data;
  variables: idErrorListsSectorsWithSlugQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "errIds"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 5
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "sectors(first:5)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "idErrorListsSectorsWithSlugQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorListsSectorsWithSlugQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "1b653f4c49fab9fdd3be4ed3de04df1c",
    "id": null,
    "metadata": {},
    "name": "idErrorListsSectorsWithSlugQuery",
    "operationKind": "query",
    "text": "query idErrorListsSectorsWithSlugQuery(\n  $errIds: [ID!]!\n) {\n  sectors(first: 5) {\n    edges {\n      node {\n        id @simulateError(onlyForIds: $errIds)\n        name\n        slug\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc02a40a3637df811ff4f5773e156c1a";

export default node;
