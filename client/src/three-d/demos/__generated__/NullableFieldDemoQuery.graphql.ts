/**
 * @generated SignedSource<<cbaef5606ff74873a58eef3f8f0ab992>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency NullableFieldDemoQuery.productPage.energyLabel {"branches":{"EnergyLabel":{"component":"../blocks/EnergyLabelBadge","fragment":"EnergyLabelBadge_label$normalization.graphql"}},"plural":false}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NullableFieldDemoQuery$variables = {
  slug: string;
};
export type NullableFieldDemoQuery$data = {
  readonly productPage: {
    readonly energyLabel: {
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"EnergyLabelBadge_label">;
    } | null;
    readonly title: string;
  } | null;
};
export type NullableFieldDemoQuery = {
  response: NullableFieldDemoQuery$data;
  variables: NullableFieldDemoQuery$variables;
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*:: as any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NullableFieldDemoQuery",
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
            "concreteType": "EnergyLabel",
            "kind": "LinkedField",
            "name": "energyLabel",
            "plural": false,
            "selections": [
              {
                "args": null,
                "documentName": "NullableFieldDemoQuery",
                "fragmentName": "EnergyLabelBadge_label",
                "fragmentPropName": "label",
                "kind": "ModuleImport"
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
    "name": "NullableFieldDemoQuery",
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
            "concreteType": "EnergyLabel",
            "kind": "LinkedField",
            "name": "energyLabel",
            "plural": false,
            "selections": [
              {
                "args": null,
                "documentName": "NullableFieldDemoQuery",
                "fragmentName": "EnergyLabelBadge_label",
                "fragmentPropName": "label",
                "kind": "ModuleImport",
                "componentModuleProvider": Object.assign(() => import('../../blocks/EnergyLabelBadge'), { modulePath: '../../blocks/EnergyLabelBadge', importer: import.meta.url }),
                "operationModuleProvider": Object.assign(() => import('../../blocks/__generated__/EnergyLabelBadge_label$normalization.graphql'), { modulePath: '../../blocks/__generated__/EnergyLabelBadge_label$normalization.graphql', importer: import.meta.url })
              },
              (v3/*:: as any*/)
            ],
            "storageKey": null
          },
          (v3/*:: as any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ad22c57680f1f9944e3ef0995f4cbac7",
    "id": null,
    "metadata": {},
    "name": "NullableFieldDemoQuery",
    "operationKind": "query",
    "text": "query NullableFieldDemoQuery(\n  $slug: String!\n) {\n  productPage(slug: $slug) {\n    title\n    energyLabel {\n      ...EnergyLabelBadge_label\n      id\n    }\n    id\n  }\n}\n\nfragment EnergyLabelBadge_label on EnergyLabel {\n  grade\n  kwhPerYear\n}\n"
  }
};
})();

(node as any).hash = "014d149e02deb0f63d6aef791bc470cb";

export default node;
