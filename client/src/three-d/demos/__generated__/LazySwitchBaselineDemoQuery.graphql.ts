/**
 * @generated SignedSource<<cbc3a1381382e17d7c15ec055708412c>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LazySwitchBaselineDemoQuery$variables = {
  slug: string;
};
export type LazySwitchBaselineDemoQuery$data = {
  readonly productPage: {
    readonly blocks: ReadonlyArray<{
      readonly __typename: string;
      readonly ImageGalleryBlock_block: {
        readonly " $fragmentSpreads": FragmentRefs<"ImageGalleryBlock_block">;
      } | null;
      readonly ReviewHighlightBlock_block: {
        readonly " $fragmentSpreads": FragmentRefs<"ReviewHighlightBlock_block">;
      } | null;
      readonly SpecsBlock_block: {
        readonly " $fragmentSpreads": FragmentRefs<"SpecsBlock_block">;
      } | null;
      readonly TextBlock_block: {
        readonly " $fragmentSpreads": FragmentRefs<"TextBlock_block">;
      } | null;
      readonly VideoBlock_block: {
        readonly " $fragmentSpreads": FragmentRefs<"VideoBlock_block">;
      } | null;
    }>;
    readonly title: string;
  } | null;
};
export type LazySwitchBaselineDemoQuery = {
  response: LazySwitchBaselineDemoQuery$data;
  variables: LazySwitchBaselineDemoQuery$variables;
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
},
v5 = [
  (v4/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LazySwitchBaselineDemoQuery",
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
                "fragment": {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "TextBlock_block"
                    }
                  ],
                  "type": "TextBlock",
                  "abstractKey": null
                },
                "kind": "AliasedInlineFragmentSpread",
                "name": "TextBlock_block"
              },
              {
                "fragment": {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ImageGalleryBlock_block"
                    }
                  ],
                  "type": "ImageGalleryBlock",
                  "abstractKey": null
                },
                "kind": "AliasedInlineFragmentSpread",
                "name": "ImageGalleryBlock_block"
              },
              {
                "fragment": {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "VideoBlock_block"
                    }
                  ],
                  "type": "VideoBlock",
                  "abstractKey": null
                },
                "kind": "AliasedInlineFragmentSpread",
                "name": "VideoBlock_block"
              },
              {
                "fragment": {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "SpecsBlock_block"
                    }
                  ],
                  "type": "SpecsBlock",
                  "abstractKey": null
                },
                "kind": "AliasedInlineFragmentSpread",
                "name": "SpecsBlock_block"
              },
              {
                "fragment": {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ReviewHighlightBlock_block"
                    }
                  ],
                  "type": "ReviewHighlightBlock",
                  "abstractKey": null
                },
                "kind": "AliasedInlineFragmentSpread",
                "name": "ReviewHighlightBlock_block"
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
    "name": "LazySwitchBaselineDemoQuery",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "heading",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "body",
                    "storageKey": null
                  }
                ],
                "type": "TextBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "images",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "alt",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "ImageGalleryBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*:: as any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "videoUrl",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "durationSeconds",
                    "storageKey": null
                  }
                ],
                "type": "VideoBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
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
              },
              {
                "kind": "InlineFragment",
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
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*:: as any*/),
                "type": "CarouselBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*:: as any*/),
                "type": "ComparisonBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*:: as any*/),
                "type": "ImageGalleryBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*:: as any*/),
                "type": "ReviewHighlightBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*:: as any*/),
                "type": "SpecsBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*:: as any*/),
                "type": "TextBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v5/*:: as any*/),
                "type": "VideoBlock",
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
    "cacheID": "df849fe5317ecc4d95feb2598f4e8d25",
    "id": null,
    "metadata": {},
    "name": "LazySwitchBaselineDemoQuery",
    "operationKind": "query",
    "text": "query LazySwitchBaselineDemoQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    title\n    blocks {\n      __typename\n      ...TextBlock_block\n      ...ImageGalleryBlock_block\n      ...VideoBlock_block\n      ...SpecsBlock_block\n      ...ReviewHighlightBlock_block\n      ... on CarouselBlock {\n        id\n      }\n      ... on ComparisonBlock {\n        id\n      }\n      ... on ImageGalleryBlock {\n        id\n      }\n      ... on ReviewHighlightBlock {\n        id\n      }\n      ... on SpecsBlock {\n        id\n      }\n      ... on TextBlock {\n        id\n      }\n      ... on VideoBlock {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ImageGalleryBlock_block on ImageGalleryBlock {\n  images {\n    url\n    alt\n  }\n}\n\nfragment ReviewHighlightBlock_block on ReviewHighlightBlock {\n  rating\n  quote\n  author\n}\n\nfragment SpecsBlock_block on SpecsBlock {\n  specs {\n    label\n    value\n  }\n}\n\nfragment TextBlock_block on TextBlock {\n  heading\n  body\n}\n\nfragment VideoBlock_block on VideoBlock {\n  title\n  videoUrl\n  durationSeconds\n}\n"
  }
};
})();

(node as any).hash = "381aee11f63dd02318fb24504297f33a";

export default node;
