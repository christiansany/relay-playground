/**
 * @generated SignedSource<<7fd5c90f0e8072fe5a59a4494c51f152>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { NormalizationSplitOperation } from 'relay-runtime';


const node: NormalizationSplitOperation = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*:: as any*/)
];
return {
  "kind": "SplitOperation",
  "metadata": {},
  "name": "CarouselBlock_block$normalization",
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
              "kind": "ModuleImport",
              "componentModuleProvider": Object.assign(() => import('../TextBlock'), { modulePath: '../TextBlock', importer: import.meta.url }),
              "operationModuleProvider": Object.assign(() => import('./TextBlock_block$normalization.graphql'), { modulePath: './TextBlock_block$normalization.graphql', importer: import.meta.url })
            },
            (v0/*:: as any*/)
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
              "kind": "ModuleImport",
              "componentModuleProvider": Object.assign(() => import('../ImageGalleryBlock'), { modulePath: '../ImageGalleryBlock', importer: import.meta.url }),
              "operationModuleProvider": Object.assign(() => import('./ImageGalleryBlock_block$normalization.graphql'), { modulePath: './ImageGalleryBlock_block$normalization.graphql', importer: import.meta.url })
            },
            (v0/*:: as any*/)
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
              "kind": "ModuleImport",
              "componentModuleProvider": Object.assign(() => import('../VideoBlock'), { modulePath: '../VideoBlock', importer: import.meta.url }),
              "operationModuleProvider": Object.assign(() => import('./VideoBlock_block$normalization.graphql'), { modulePath: './VideoBlock_block$normalization.graphql', importer: import.meta.url })
            },
            (v0/*:: as any*/)
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
              "kind": "ModuleImport",
              "componentModuleProvider": Object.assign(() => import('../SpecsBlock'), { modulePath: '../SpecsBlock', importer: import.meta.url }),
              "operationModuleProvider": Object.assign(() => import('./SpecsBlock_block$normalization.graphql'), { modulePath: './SpecsBlock_block$normalization.graphql', importer: import.meta.url })
            },
            (v0/*:: as any*/)
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
              "kind": "ModuleImport",
              "componentModuleProvider": Object.assign(() => import('../ReviewHighlightBlock'), { modulePath: '../ReviewHighlightBlock', importer: import.meta.url }),
              "operationModuleProvider": Object.assign(() => import('./ReviewHighlightBlock_block$normalization.graphql'), { modulePath: './ReviewHighlightBlock_block$normalization.graphql', importer: import.meta.url })
            },
            (v0/*:: as any*/)
          ],
          "type": "ReviewHighlightBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*:: as any*/),
          "type": "CarouselBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": (v1/*:: as any*/),
          "type": "ComparisonBlock",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ]
};
})();

(node as any).hash = "6e0a889d038d2e07d0259a3f29e57d62";

export default node;
