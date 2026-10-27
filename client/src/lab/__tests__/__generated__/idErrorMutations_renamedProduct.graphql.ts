/**
 * @generated SignedSource<<73ad56c9294790482e15c5f6c22eaae7>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type idErrorMutations_renamedProduct$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "idErrorMutations_renamedProduct";
};
export type idErrorMutations_renamedProduct$key = {
  readonly " $data"?: idErrorMutations_renamedProduct$data;
  readonly " $fragmentSpreads": FragmentRefs<"idErrorMutations_renamedProduct">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "throwOnFieldError": true
  },
  "name": "idErrorMutations_renamedProduct",
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
  "type": "Product",
  "abstractKey": null
};

(node as any).hash = "8032d2b3844cc8626b808bafebd3263c";

export default node;
