/**
 * @generated SignedSource<<89f5302e0b6548e0a899c8db9219f5d8>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { SaleBadge as saleBadgeRelayModelInstanceResolverType } from "../SaleBadge";
// Type assertion validating that `saleBadgeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(saleBadgeRelayModelInstanceResolverType satisfies (
  id: SaleBadge__id$data['id'],
) => unknown);
export type SaleBadge____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof saleBadgeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "SaleBadge____relay_model_instance";
};
export type SaleBadge____relay_model_instance$key = {
  readonly " $data"?: SaleBadge____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleBadge____relay_model_instance">;
};

import {SaleBadge as saleBadgeRelayModelInstanceResolver} from '../SaleBadge';
import SaleBadge__id_graphql from './SaleBadge__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleBadge____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SaleBadge__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(SaleBadge__id_graphql, saleBadgeRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "SaleBadge",
  "abstractKey": null
};

export default node;
