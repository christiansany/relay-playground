/**
 * @generated SignedSource<<98a447b83a45c915dc339ffeb155990d>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReviewHighlightBlock_block$data = {
  readonly author: string;
  readonly quote: string;
  readonly rating: number;
  readonly " $fragmentType": "ReviewHighlightBlock_block";
};
export type ReviewHighlightBlock_block$key = {
  readonly " $data"?: ReviewHighlightBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReviewHighlightBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewHighlightBlock_block",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rating",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "quote",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "author",
      "storageKey": null
    }
  ],
  "type": "ReviewHighlightBlock",
  "abstractKey": null
};

(node as any).hash = "9fe1707e6ceb8590cc16fe20c77ab10f";

export default node;
