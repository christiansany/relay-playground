/**
 * Finds the store states that errors on `id` can produce. Works on the
 * plain `RecordSource#toJSON()` shape so it can run in tests and in the UI.
 */
export type RecordMap = Record<string, Record<string, unknown> | null | undefined>;

export type StoreIssueKind =
  /** An entity type stored under a `client:` id: it is not normalized, other views of the same entity won't see it. */
  | "ENTITY_UNDER_CLIENT_ID"
  /** A record stored under a server id whose `id` field doesn't match it (e.g. `null`). */
  | "ID_FIELD_MISMATCH"
  /** The record carries a field error for `id`. */
  | "ID_FIELD_ERROR";

export type StoreIssue = {
  readonly kind: StoreIssueKind;
  readonly dataID: string;
  readonly typename: string | undefined;
  readonly detail: string;
};

export const NODE_TYPES: ReadonlySet<string> = new Set(["Product", "ProductType", "Sector"]);

export function isClientID(dataID: string): boolean {
  return dataID.startsWith("client:");
}

export function diagnoseStore(records: RecordMap, nodeTypes = NODE_TYPES): StoreIssue[] {
  const issues: StoreIssue[] = [];
  for (const [dataID, record] of Object.entries(records)) {
    if (record == null) continue;
    const typename = record.__typename as string | undefined;
    const errors = record.__errors as Record<string, unknown> | undefined;
    if (errors?.id != null) {
      issues.push({ kind: "ID_FIELD_ERROR", dataID, typename, detail: "`id` has a field error" });
    }
    if (typename != null && nodeTypes.has(typename) && isClientID(dataID)) {
      issues.push({
        kind: "ENTITY_UNDER_CLIENT_ID",
        dataID,
        typename,
        detail: `${typename} stored under a client id (not normalized)`,
      });
    }
    if (!isClientID(dataID) && "id" in record && record.id !== dataID) {
      issues.push({
        kind: "ID_FIELD_MISMATCH",
        dataID,
        typename,
        detail: `record ${dataID} has id = ${JSON.stringify(record.id)}`,
      });
    }
  }
  return issues;
}
