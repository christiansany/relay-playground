/**
 * @generated SignedSource<<cf93dece50835e1d52962ec9c9fe5554>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency Server3DSsrPageQuery.productPage.blocks {"branches":{"SpecsBlock":{"component":"Server3DSpecsBlock","fragment":"Server3DSpecsBlock_block$normalization.graphql"},"TextBlock":{"component":"Server3DTextBlock","fragment":"Server3DTextBlock_block$normalization.graphql"},"VideoBlock":{"component":"Server3DVideoBlock","fragment":"Server3DVideoBlock_block$normalization.graphql"}},"plural":true}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Server3DSsrPageQuery$variables = {
  slug: string;
};
export type Server3DSsrPageQuery$data = {
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
export type Server3DSsrPageQuery = {
  response: Server3DSsrPageQuery$data;
  variables: Server3DSsrPageQuery$variables;
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
  "documentName": "Server3DSsrPageQuery",
  "fragmentName": "Server3DTextBlock_block",
  "fragmentPropName": "block",
  "kind": "ModuleImport"
},
v5 = {
  "args": null,
  "documentName": "Server3DSsrPageQuery",
  "fragmentName": "Server3DVideoBlock_block",
  "fragmentPropName": "block",
  "kind": "ModuleImport"
},
v6 = {
  "args": null,
  "documentName": "Server3DSsrPageQuery",
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
    "name": "Server3DSsrPageQuery",
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
    "name": "Server3DSsrPageQuery",
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
    "cacheID": "c199fde49ddf2194a779b86a4c220351",
    "id": null,
    "metadata": {},
    "name": "Server3DSsrPageQuery",
    "operationKind": "query",
    "text": "query Server3DSsrPageQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    title\n    blocks {\n      __typename\n      ... on TextBlock {\n        ...Server3DTextBlock_block\n        __module_operation_Server3DSsrPageQuery: js(module: \"Server3DTextBlock_block$normalization.graphql\", id: \"Server3DSsrPageQuery.productPage.blocks\")\n        __module_component_Server3DSsrPageQuery: js(module: \"Server3DTextBlock\", id: \"Server3DSsrPageQuery.productPage.blocks\")\n        id\n      }\n      ... on VideoBlock {\n        ...Server3DVideoBlock_block\n        __module_operation_Server3DSsrPageQuery: js(module: \"Server3DVideoBlock_block$normalization.graphql\", id: \"Server3DSsrPageQuery.productPage.blocks\")\n        __module_component_Server3DSsrPageQuery: js(module: \"Server3DVideoBlock\", id: \"Server3DSsrPageQuery.productPage.blocks\")\n        id\n      }\n      ... on SpecsBlock {\n        ...Server3DSpecsBlock_block\n        __module_operation_Server3DSsrPageQuery: js(module: \"Server3DSpecsBlock_block$normalization.graphql\", id: \"Server3DSsrPageQuery.productPage.blocks\")\n        __module_component_Server3DSsrPageQuery: js(module: \"Server3DSpecsBlock\", id: \"Server3DSsrPageQuery.productPage.blocks\")\n        id\n      }\n      ... on CarouselBlock {\n        id\n      }\n      ... on ComparisonBlock {\n        id\n      }\n      ... on ImageGalleryBlock {\n        id\n      }\n      ... on ReviewHighlightBlock {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Server3DSpecsBlock_block on SpecsBlock {\n  specs {\n    label\n    value\n  }\n}\n\nfragment Server3DTextBlock_block on TextBlock {\n  heading\n  body\n}\n\nfragment Server3DVideoBlock_block on VideoBlock {\n  title\n  videoUrl\n}\n"
  }
};
})();

(node as any).hash = "f9c9b625da51f52c77fee298a72879e2";

export default node;
