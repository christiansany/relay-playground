/**
 * @generated SignedSource<<9dee8782947d167217e1eafe575f2dd6>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency NonReactModuleDemoQuery.productPage.blocks {"branches":{"SpecsBlock":{"component":"../formatters/specsCsv","fragment":"NonReactModuleDemo_specs$normalization.graphql"}},"plural":true}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NonReactModuleDemoQuery$variables = {
  slug: string;
};
export type NonReactModuleDemoQuery$data = {
  readonly productPage: {
    readonly blocks: ReadonlyArray<{
      readonly __typename: "SpecsBlock";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"NonReactModuleDemo_specs">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }>;
    readonly title: string;
  } | null;
};
export type NonReactModuleDemoQuery = {
  response: NonReactModuleDemoQuery$data;
  variables: NonReactModuleDemoQuery$variables;
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
    "name": "NonReactModuleDemoQuery",
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
                    "documentName": "NonReactModuleDemoQuery",
                    "fragmentName": "NonReactModuleDemo_specs",
                    "fragmentPropName": "specs",
                    "kind": "ModuleImport"
                  }
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
    "name": "NonReactModuleDemoQuery",
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
                    "documentName": "NonReactModuleDemoQuery",
                    "fragmentName": "NonReactModuleDemo_specs",
                    "fragmentPropName": "specs",
                    "kind": "ModuleImport",
                    "componentModuleProvider": Object.assign(() => import('../../formatters/specsCsv'), { modulePath: '../../formatters/specsCsv', importer: import.meta.url }),
                    "operationModuleProvider": Object.assign(() => import('./NonReactModuleDemo_specs$normalization.graphql'), { modulePath: './NonReactModuleDemo_specs$normalization.graphql', importer: import.meta.url })
                  },
                  (v4/*:: as any*/)
                ],
                "type": "SpecsBlock",
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
    "cacheID": "e9713fd6f837e43c815c1fbffb599d31",
    "id": null,
    "metadata": {},
    "name": "NonReactModuleDemoQuery",
    "operationKind": "query",
    "text": "query NonReactModuleDemoQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    title\n    blocks {\n      __typename\n      ... on SpecsBlock {\n        ...NonReactModuleDemo_specs\n        id\n      }\n      ... on CarouselBlock {\n        id\n      }\n      ... on ComparisonBlock {\n        id\n      }\n      ... on ImageGalleryBlock {\n        id\n      }\n      ... on ReviewHighlightBlock {\n        id\n      }\n      ... on TextBlock {\n        id\n      }\n      ... on VideoBlock {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment NonReactModuleDemo_specs on SpecsBlock {\n  specs {\n    label\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "ffe2f54f54f7f4d83840c357b89d4463";

export default node;
