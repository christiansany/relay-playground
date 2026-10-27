/**
 * @generated SignedSource<<938f88ade8281c1267cd2eff9b93dbcd>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type idErrorHooksThrowingPageQuery$variables = Record<PropertyKey, never>;
export type idErrorHooksThrowingPageQuery$data = {
  readonly productTypeBySlug: {
    readonly id: string;
    readonly name: string;
  } | null;
};
export type idErrorHooksThrowingPageQuery = {
  response: idErrorHooksThrowingPageQuery$data;
  variables: idErrorHooksThrowingPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "slug",
        "value": "beverages"
      }
    ],
    "concreteType": "ProductType",
    "kind": "LinkedField",
    "name": "productTypeBySlug",
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
    "storageKey": "productTypeBySlug(slug:\"beverages\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": {
      "throwOnFieldError": true
    },
    "name": "idErrorHooksThrowingPageQuery",
    "selections": (v0/*:: as any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "idErrorHooksThrowingPageQuery",
    "selections": (v0/*:: as any*/)
  },
  "params": {
    "cacheID": "a96f12a090345a2b6194fcb01499deb5",
    "id": null,
    "metadata": {},
    "name": "idErrorHooksThrowingPageQuery",
    "operationKind": "query",
    "text": "query idErrorHooksThrowingPageQuery {\n  productTypeBySlug(slug: \"beverages\") {\n    id @simulateError\n    name\n  }\n}\n"
  }
};
})();

(node as any).hash = "1525b88672fac22f6813ca5f36aa41f9";

export default node;
