/**
 * @generated SignedSource<<808e0c8ab0c059f6637dd25a9dc7e1a6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency UnionBlocksDemoQuery.productPage.blocks {"branches":{"CarouselBlock":{"component":"../blocks/CarouselBlock","fragment":"CarouselBlock_block$normalization.graphql"},"ImageGalleryBlock":{"component":"../blocks/ImageGalleryBlock","fragment":"ImageGalleryBlock_block$normalization.graphql"},"ReviewHighlightBlock":{"component":"../blocks/ReviewHighlightBlock","fragment":"ReviewHighlightBlock_block$normalization.graphql"},"SpecsBlock":{"component":"../blocks/SpecsBlock","fragment":"SpecsBlock_block$normalization.graphql"},"TextBlock":{"component":"../blocks/TextBlock","fragment":"TextBlock_block$normalization.graphql"},"VideoBlock":{"component":"../blocks/VideoBlock","fragment":"VideoBlock_block$normalization.graphql"}},"plural":true}
// @indirectDataDrivenDependency CarouselBlock_block.items {"branches":{"ImageGalleryBlock":{"component":"./ImageGalleryBlock","fragment":"ImageGalleryBlock_block$normalization.graphql"},"ReviewHighlightBlock":{"component":"./ReviewHighlightBlock","fragment":"ReviewHighlightBlock_block$normalization.graphql"},"SpecsBlock":{"component":"./SpecsBlock","fragment":"SpecsBlock_block$normalization.graphql"},"TextBlock":{"component":"./TextBlock","fragment":"TextBlock_block$normalization.graphql"},"VideoBlock":{"component":"./VideoBlock","fragment":"VideoBlock_block$normalization.graphql"}},"plural":true}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnionBlocksDemoQuery$variables = {
  slug: string;
};
export type UnionBlocksDemoQuery$data = {
  readonly productPage: {
    readonly blocks: ReadonlyArray<{
      readonly __typename: "CarouselBlock";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"CarouselBlock_block">;
    } | {
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
  } | null;
};
export type UnionBlocksDemoQuery = {
  response: UnionBlocksDemoQuery$data;
  variables: UnionBlocksDemoQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnionBlocksDemoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductPage",
        "kind": "LinkedField",
        "name": "productPage",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "blocks",
            "plural": true,
            "selections": [
              (v3/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
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
                    "documentName": "UnionBlocksDemoQuery",
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
                    "documentName": "UnionBlocksDemoQuery",
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
                    "documentName": "UnionBlocksDemoQuery",
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
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "ReviewHighlightBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport"
                  }
                ],
                "type": "ReviewHighlightBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "CarouselBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport"
                  }
                ],
                "type": "CarouselBlock",
                "abstractKey": null
              }
            ],
            "storageKey": null
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
    "name": "UnionBlocksDemoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*:: as any*/),
        "concreteType": "ProductPage",
        "kind": "LinkedField",
        "name": "productPage",
        "plural": false,
        "selections": [
          (v2/*:: as any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "blocks",
            "plural": true,
            "selections": [
              (v3/*:: as any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "TextBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/TextBlock'), { modulePath: '../../blocks/TextBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/TextBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/TextBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v4/*:: as any*/)
                ],
                "type": "TextBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "ImageGalleryBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/ImageGalleryBlock'), { modulePath: '../../blocks/ImageGalleryBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/ImageGalleryBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/ImageGalleryBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v4/*:: as any*/)
                ],
                "type": "ImageGalleryBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "VideoBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/VideoBlock'), { modulePath: '../../blocks/VideoBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/VideoBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/VideoBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v4/*:: as any*/)
                ],
                "type": "VideoBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "SpecsBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/SpecsBlock'), { modulePath: '../../blocks/SpecsBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/SpecsBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/SpecsBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v4/*:: as any*/)
                ],
                "type": "SpecsBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "ReviewHighlightBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/ReviewHighlightBlock'), { modulePath: '../../blocks/ReviewHighlightBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/ReviewHighlightBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/ReviewHighlightBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v4/*:: as any*/)
                ],
                "type": "ReviewHighlightBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "args": null,
                    "documentName": "UnionBlocksDemoQuery",
                    "fragmentName": "CarouselBlock_block",
                    "fragmentPropName": "block",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../blocks/CarouselBlock'), { modulePath: '../../blocks/CarouselBlock', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/CarouselBlock_block$normalization.graphql'), { modulePath: '../../blocks/__generated__/CarouselBlock_block$normalization.graphql', importer: import.meta.url })
                  },
                  (v4/*:: as any*/)
                ],
                "type": "CarouselBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v4/*:: as any*/)
                ],
                "type": "ComparisonBlock",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "36e325faecb43186c72473d6c8bc6d44",
    "id": null,
    "metadata": {},
    "name": "UnionBlocksDemoQuery",
    "operationKind": "query",
    "text": "query UnionBlocksDemoQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    title\n    blocks {\n      __typename\n      ... on TextBlock {\n        ...TextBlock_block\n        id\n      }\n      ... on ImageGalleryBlock {\n        ...ImageGalleryBlock_block\n        id\n      }\n      ... on VideoBlock {\n        ...VideoBlock_block\n        id\n      }\n      ... on SpecsBlock {\n        ...SpecsBlock_block\n        id\n      }\n      ... on ReviewHighlightBlock {\n        ...ReviewHighlightBlock_block\n        id\n      }\n      ... on CarouselBlock {\n        ...CarouselBlock_block\n        id\n      }\n      ... on ComparisonBlock {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment CarouselBlock_block on CarouselBlock {\n  title\n  items {\n    __typename\n    ... on TextBlock {\n      ...TextBlock_block\n      id\n    }\n    ... on ImageGalleryBlock {\n      ...ImageGalleryBlock_block\n      id\n    }\n    ... on VideoBlock {\n      ...VideoBlock_block\n      id\n    }\n    ... on SpecsBlock {\n      ...SpecsBlock_block\n      id\n    }\n    ... on ReviewHighlightBlock {\n      ...ReviewHighlightBlock_block\n      id\n    }\n    ... on CarouselBlock {\n      id\n    }\n    ... on ComparisonBlock {\n      id\n    }\n  }\n}\n\nfragment ImageGalleryBlock_block on ImageGalleryBlock {\n  images {\n    url\n    alt\n  }\n}\n\nfragment ReviewHighlightBlock_block on ReviewHighlightBlock {\n  rating\n  quote\n  author\n}\n\nfragment SpecsBlock_block on SpecsBlock {\n  specs {\n    label\n    value\n  }\n}\n\nfragment TextBlock_block on TextBlock {\n  heading\n  body\n}\n\nfragment VideoBlock_block on VideoBlock {\n  title\n  videoUrl\n  durationSeconds\n}\n"
  }
};
})();

(node as any).hash = "7d588815b6083a0170bd84ade50cbc20";

export default node;
