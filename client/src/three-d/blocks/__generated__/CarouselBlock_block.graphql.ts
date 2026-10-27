/**
 * @generated SignedSource<<67db358340928caa785032463a294279>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency CarouselBlock_block.items {"branches":{"ImageGalleryBlock":{"component":"./ImageGalleryBlock","fragment":"ImageGalleryBlock_block$normalization.graphql"},"ReviewHighlightBlock":{"component":"./ReviewHighlightBlock","fragment":"ReviewHighlightBlock_block$normalization.graphql"},"SpecsBlock":{"component":"./SpecsBlock","fragment":"SpecsBlock_block$normalization.graphql"},"TextBlock":{"component":"./TextBlock","fragment":"TextBlock_block$normalization.graphql"},"VideoBlock":{"component":"./VideoBlock","fragment":"VideoBlock_block$normalization.graphql"}},"plural":true}

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CarouselBlock_block$data = {
  readonly items: ReadonlyArray<{
    readonly __typename: "ImageGalleryBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ImageGalleryBlock_block">;
  } | {
    readonly __typename: "ReviewHighlightBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ReviewHighlightBlock_block">;
  } | {
    readonly __typename: "SpecsBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"SpecsBlock_block">;
  } | {
    readonly __typename: "TextBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"TextBlock_block">;
  } | {
    readonly __typename: "VideoBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"VideoBlock_block">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly title: string;
  readonly " $fragmentType": "CarouselBlock_block";
};
export type CarouselBlock_block$key = {
  readonly " $data"?: CarouselBlock_block$data;
  readonly " $fragmentSpreads": FragmentRefs<"CarouselBlock_block">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CarouselBlock_block",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "CarouselBlock_block",
              "fragmentName": "TextBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "TextBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "CarouselBlock_block",
              "fragmentName": "ImageGalleryBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "ImageGalleryBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "CarouselBlock_block",
              "fragmentName": "VideoBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "VideoBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "CarouselBlock_block",
              "fragmentName": "SpecsBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "SpecsBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "CarouselBlock_block",
              "fragmentName": "ReviewHighlightBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "ReviewHighlightBlock",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CarouselBlock",
  "abstractKey": null
};

(node as any).hash = "6e0a889d038d2e07d0259a3f29e57d62";

export default node;
