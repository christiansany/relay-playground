import type { DataID } from "relay-runtime";

export type SaleBadgeModel = { __id: DataID };

/**
 * @relayType SaleBadge implements IPromoBadge
 */
export function SaleBadge(id: DataID): SaleBadgeModel {
  return { __id: id };
}

/**
 * @relayField SaleBadge.discountLabel: String
 */
export function discountLabel(model: SaleBadgeModel): string {
  return `-23% (resolver for ${model.__id})`;
}
