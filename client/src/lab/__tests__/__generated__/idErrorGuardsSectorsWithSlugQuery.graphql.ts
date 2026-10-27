/**
 * @generated SignedSource<<30f2eff6d348ee6b7b24c522d6399c24>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorGuardsSectorsWithSlugQuery$variables = {
  errIds: ReadonlyArray<string>;
};
export type idErrorGuardsSectorsWithSlugQuery$data = {
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
export type idErrorGuardsSectorsWithSlugQuery = {
  response: idErrorGuardsSectorsWithSlugQuery$data;
  variables: idErrorGuardsSectorsWithSlugQuery$variables;
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
    "name": "idErrorGuardsSectorsWithSlugQuery",
    "selections": (v1/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Operation",
    "name": "idErrorGuardsSectorsWithSlugQuery",
    "selections": (v1/*:: as any*/)
  },
  "params": {
    "cacheID": "ac998cf6ad233fff588f7ced6e94fa4c",
    "id": null,
    "metadata": {},
    "name": "idErrorGuardsSectorsWithSlugQuery",
    "operationKind": "query",
    "text": "query idErrorGuardsSectorsWithSlugQuery(\n  $errIds: [ID!]!\n) {\n  sectors(first: 5) {\n    edges {\n      node {\n        id @simulateError(onlyForIds: $errIds)\n        name\n        slug\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b68672af516efa3baf2c3c452bf006df";

export default node;
