/**
 * @generated SignedSource<<5b7bc29a612f1cf3ccb7e6b6e9c1db97>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency Server3DDemoQuery.productPage.blocks {"branches":{"SpecsBlock":{"component":"Server3DSpecsBlock","fragment":"Server3DSpecsBlock_block$normalization.graphql"},"TextBlock":{"component":"Server3DTextBlock","fragment":"Server3DTextBlock_block$normalization.graphql"},"VideoBlock":{"component":"Server3DVideoBlock","fragment":"Server3DVideoBlock_block$normalization.graphql"}},"plural":true}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Server3DDemoQuery$variables = {
  slug: string;
};
export type Server3DDemoQuery$data = {
  readonly productPage: {
    readonly blocks: ReadonlyArray<{
      readonly __typename: "SpecsBlock";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"Server3DSpecsBlock_block">;
    } | {
      readonly __typename: "TextBlock";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"Server3DTextBlock_block">;
    } | {
      readonly __typename: "VideoBlock";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"Server3DVideoBlock_block">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }>;
    readonly title: string;
  } | null;
};
export type Server3DDemoQuery = {
  response: Server3DDemoQuery$data;
  variables: Server3DDemoQuery$variables;
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
  "args": null,
  "documentName": "Server3DDemoQuery",
  "fragmentName": "Server3DTextBlock_block",
  "fragmentPropName": "block",
  "kind": "ModuleImport"
},
v5 = {
  "args": null,
  "documentName": "Server3DDemoQuery",
  "fragmentName": "Server3DVideoBlock_block",
  "fragmentPropName": "block",
  "kind": "ModuleImport"
},
v6 = {
  "args": null,
  "documentName": "Server3DDemoQuery",
  "fragmentName": "Server3DSpecsBlock_block",
  "fragmentPropName": "block",
  "kind": "ModuleImport"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v7/*:: as any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Server3DDemoQuery",
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
                  (v4/*:: as any*/)
                ],
                "type": "TextBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*:: as any*/)
                ],
                "type": "VideoBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*:: as any*/)
                ],
                "type": "SpecsBlock",
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
    "name": "Server3DDemoQuery",
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
                  (v4/*:: as any*/),
                  (v7/*:: as any*/)
                ],
                "type": "TextBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*:: as any*/),
                  (v7/*:: as any*/)
                ],
                "type": "VideoBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*:: as any*/),
                  (v7/*:: as any*/)
                ],
                "type": "SpecsBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*:: as any*/),
                "type": "CarouselBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*:: as any*/),
                "type": "ComparisonBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*:: as any*/),
                "type": "ImageGalleryBlock",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v8/*:: as any*/),
                "type": "ReviewHighlightBlock",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b287b3897599137871f23a59c21f1059",
    "id": null,
    "metadata": {},
    "name": "Server3DDemoQuery",
    "operationKind": "query",
    "text": "query Server3DDemoQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    title\n    blocks {\n      __typename\n      ... on TextBlock {\n        ...Server3DTextBlock_block\n        __module_operation_Server3DDemoQuery: js(module: \"Server3DTextBlock_block$normalization.graphql\", id: \"Server3DDemoQuery.productPage.blocks\")\n        __module_component_Server3DDemoQuery: js(module: \"Server3DTextBlock\", id: \"Server3DDemoQuery.productPage.blocks\")\n        id\n      }\n      ... on VideoBlock {\n        ...Server3DVideoBlock_block\n        __module_operation_Server3DDemoQuery: js(module: \"Server3DVideoBlock_block$normalization.graphql\", id: \"Server3DDemoQuery.productPage.blocks\")\n        __module_component_Server3DDemoQuery: js(module: \"Server3DVideoBlock\", id: \"Server3DDemoQuery.productPage.blocks\")\n        id\n      }\n      ... on SpecsBlock {\n        ...Server3DSpecsBlock_block\n        __module_operation_Server3DDemoQuery: js(module: \"Server3DSpecsBlock_block$normalization.graphql\", id: \"Server3DDemoQuery.productPage.blocks\")\n        __module_component_Server3DDemoQuery: js(module: \"Server3DSpecsBlock\", id: \"Server3DDemoQuery.productPage.blocks\")\n        id\n      }\n      ... on CarouselBlock {\n        id\n      }\n      ... on ComparisonBlock {\n        id\n      }\n      ... on ImageGalleryBlock {\n        id\n      }\n      ... on ReviewHighlightBlock {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Server3DSpecsBlock_block on SpecsBlock {\n  specs {\n    label\n    value\n  }\n}\n\nfragment Server3DTextBlock_block on TextBlock {\n  heading\n  body\n}\n\nfragment Server3DVideoBlock_block on VideoBlock {\n  title\n  videoUrl\n}\n"
  }
};
})();

(node as any).hash = "37f3f26b2e93c84f056ca406538557c5";

export default node;
