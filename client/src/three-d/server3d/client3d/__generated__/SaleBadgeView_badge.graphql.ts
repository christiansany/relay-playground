/**
 * @generated SignedSource<<f390ba8e2ce74af3853fe2c825612666>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
import { discountLabel as saleBadgeDiscountLabelResolverType } from "../SaleBadge";
// Type assertion validating that `saleBadgeDiscountLabelResolverType` resolver is correctly implemented.
// A type error here indicates that the type signature of the resolver module is incorrect.
(saleBadgeDiscountLabelResolverType satisfies (
  __relay_model_instance: SaleBadge____relay_model_instance$data['__relay_model_instance'],
) => string | null);
export type SaleBadgeView_badge$data = {
  readonly discountLabel: string | null;
  readonly " $fragmentType": "SaleBadgeView_badge";
};
export type SaleBadgeView_badge$key = {
  readonly " $data"?: SaleBadgeView_badge$data;
  readonly " $fragmentSpreads": FragmentRefs<"SaleBadgeView_badge">;
};

import {discountLabel as saleBadgeDiscountLabelResolver} from '../SaleBadge';
import SaleBadge____relay_model_instance_graphql from './SaleBadge____relay_model_instance.graphql';
import {resolverDataInjector} from 'relay-runtime/experimental';

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SaleBadgeView_badge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "fragment": {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SaleBadge____relay_model_instance"
      },
      "kind": "RelayResolver",
      "name": "discountLabel",
      "resolverModule": resolverDataInjector(SaleBadge____relay_model_instance_graphql, saleBadgeDiscountLabelResolver, '__relay_model_instance', true),
      "path": "discountLabel"
    }
  ],
  "type": "SaleBadge",
  "abstractKey": null
};

(node as any).hash = "bb449315bc6b1c42d0e9e0a7dcf17172";

export default node;
