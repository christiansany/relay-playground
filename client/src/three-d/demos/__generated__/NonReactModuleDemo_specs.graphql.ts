/**
 * @generated SignedSource<<f5293027825ae09107ce2ae2acc6789d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NonReactModuleDemo_specs$data = {
  readonly specs: ReadonlyArray<{
    readonly label: string;
    readonly value: string;
  }>;
  readonly " $fragmentType": "NonReactModuleDemo_specs";
};
export type NonReactModuleDemo_specs$key = {
  readonly " $data"?: NonReactModuleDemo_specs$data;
  readonly " $fragmentSpreads": FragmentRefs<"NonReactModuleDemo_specs">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NonReactModuleDemo_specs",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Spec",
      "kind": "LinkedField",
      "name": "specs",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "label",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SpecsBlock",
  "abstractKey": null
};

(node as any).hash = "370d2382c5af7a4132255dd223e3e0ba";

export default node;
