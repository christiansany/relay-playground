/**
 * @generated SignedSource<<ed9fc78406bd4c996ff756fdeb6fb937>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { since as newBadgeSinceResolverType } from "../NewBadge";
// Type assertion validating that `newBadgeSinceResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(newBadgeSinceResolverType satisfies (
  __relay_model_instance: NewBadge____relay_model_instance$data['__relay_model_instance'],
) => string | null);
export type NewBadgeView_badge$data = {
  readonly since: string | null;
  readonly " $fragmentType": "NewBadgeView_badge";
};
export type NewBadgeView_badge$key = {
  readonly " $data"?: NewBadgeView_badge$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewBadgeView_badge">;
};

import {since as newBadgeSinceResolver} from '../NewBadge';
import NewBadge____relay_model_instance_graphql from './NewBadge____relay_model_instance.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewBadgeView_badge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "NewBadge____relay_model_instance"
      },
      "kind": "RelayResolver",
      "name": "since",
      "resolverModule": resolverDataInjector(NewBadge____relay_model_instance_graphql, newBadgeSinceResolver, '__relay_model_instance', true),
      "path": "since"
    }
  ],
  "type": "NewBadge",
  "abstractKey": null
};

(node as any).hash = "d9fc188d837d834dc0977ece86791072";

export default node;
