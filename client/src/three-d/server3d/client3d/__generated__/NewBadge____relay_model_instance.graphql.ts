/**
 * @generated SignedSource<<9ae83011a2b6298d0b8216149b111110>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { NewBadge as newBadgeRelayModelInstanceResolverType } from "../NewBadge";
// Type assertion validating that `newBadgeRelayModelInstanceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(newBadgeRelayModelInstanceResolverType satisfies (
  id: NewBadge__id$data['id'],
) => unknown);
export type NewBadge____relay_model_instance$data = {
  readonly __relay_model_instance: NonNullable<ReturnType<typeof newBadgeRelayModelInstanceResolverType>>;
  readonly " $fragmentType": "NewBadge____relay_model_instance";
};
export type NewBadge____relay_model_instance$key = {
  readonly " $data"?: NewBadge____relay_model_instance$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewBadge____relay_model_instance">;
};

import {NewBadge as newBadgeRelayModelInstanceResolver} from '../NewBadge';
import NewBadge__id_graphql from './NewBadge__id.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewBadge____relay_model_instance",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "NewBadge__id"
      },
      "kind": "RelayResolver",
      "name": "__relay_model_instance",
      "resolverModule": resolverDataInjector(NewBadge__id_graphql, newBadgeRelayModelInstanceResolver, 'id', true),
      "path": "__relay_model_instance"
    }
  ],
  "type": "NewBadge",
  "abstractKey": null
};

export default node;
