import type { DataID } from "relay-runtime";

export type NewBadgeModel = { __id: DataID };

/**
 * @relayType NewBadge implements IPromoBadge
 */
export function NewBadge(id: DataID): NewBadgeModel {
  return { __id: id };
}

/**
 * @relayField NewBadge.since: String
 */
export function since(model: NewBadgeModel): string {
  return `new since this week (resolver for ${model.__id})`;
}
