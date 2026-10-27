/**
 * @generated SignedSource<<a61f29858bb7a24141244756e144ee5f>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency Client3DDemoQuery.promoSlot.badge {"branches":{"NewBadge":{"component":"./NewBadgeView","fragment":"NewBadgeView_badge$normalization.graphql","read_time_resolvers":true},"SaleBadge":{"component":"./SaleBadgeView","fragment":"SaleBadgeView_badge$normalization.graphql","read_time_resolvers":true}},"plural":false}

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Client3DDemoQuery$variables = Record<PropertyKey, never>;
export type Client3DDemoQuery$data = {
  readonly promoSlot: {
    readonly badge: {
      readonly __typename: "NewBadge";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"NewBadgeView_badge">;
    } | {
      readonly __typename: "SaleBadge";
      readonly __fragmentPropName: string | null;
      readonly __module_component: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"SaleBadgeView_badge">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null;
  } | null;
};
export type Client3DDemoQuery = {
  response: Client3DDemoQuery$data;
  variables: Client3DDemoQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Client3DDemoQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PromoSlot",
            "kind": "LinkedField",
            "name": "promoSlot",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "badge",
                "plural": false,
                "selections": [
                  (v0/*:: as any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "args": null,
                        "documentName": "Client3DDemoQuery",
                        "fragmentName": "SaleBadgeView_badge",
                        "fragmentPropName": "badge",
                        "kind": "ModuleImport",
                        "componentModuleProvider": Object.assign(() => import('../SaleBadgeView'), { modulePath: '../SaleBadgeView', importer: import.meta.url })
                      }
                    ],
                    "type": "SaleBadge",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "args": null,
                        "documentName": "Client3DDemoQuery",
                        "fragmentName": "NewBadgeView_badge",
                        "fragmentPropName": "badge",
                        "kind": "ModuleImport",
                        "componentModuleProvider": Object.assign(() => import('../NewBadgeView'), { modulePath: '../NewBadgeView', importer: import.meta.url })
                      }
                    ],
                    "type": "NewBadge",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Client3DDemoQuery",
    "selections": [
      {
        "kind": "ClientExtension",
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PromoSlot",
            "kind": "LinkedField",
            "name": "promoSlot",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "badge",
                "plural": false,
                "selections": [
                  (v0/*:: as any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "args": null,
                        "documentName": "Client3DDemoQuery",
                        "fragmentName": "SaleBadgeView_badge",
                        "fragmentPropName": "badge",
                        "kind": "ModuleImport",
                        "componentModuleProvider": Object.assign(() => import('../SaleBadgeView'), { modulePath: '../SaleBadgeView', importer: import.meta.url }),
                        "operationModuleProvider": Object.assign(() => import('./SaleBadgeView_badge$normalization.graphql'), { modulePath: './SaleBadgeView_badge$normalization.graphql', importer: import.meta.url })
                      }
                    ],
                    "type": "SaleBadge",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "args": null,
                        "documentName": "Client3DDemoQuery",
                        "fragmentName": "NewBadgeView_badge",
                        "fragmentPropName": "badge",
                        "kind": "ModuleImport",
                        "componentModuleProvider": Object.assign(() => import('../NewBadgeView'), { modulePath: '../NewBadgeView', importer: import.meta.url }),
                        "operationModuleProvider": Object.assign(() => import('./NewBadgeView_badge$normalization.graphql'), { modulePath: './NewBadgeView_badge$normalization.graphql', importer: import.meta.url })
                      }
                    ],
                    "type": "NewBadge",
                    "abstractKey": null
                  },
                  (v1/*:: as any*/)
                ],
                "storageKey": null
              },
              (v1/*:: as any*/)
            ],
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "d07f4739dd4c01a644e0d5978d132527",
    "id": null,
    "metadata": {},
    "name": "Client3DDemoQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "baa0e05afdf1f5bd9be91a9e4f277313";

export default node;
