import { useState } from "react";
import { Json, Note, Row, colors } from "./components/ui.js";
import { useLab, useLabActivity } from "./LabContext.js";
import {
  diagnoseStore,
  isClientID,
  NODE_TYPES,
  type RecordMap,
  type StoreIssue,
} from "./storeDiagnostics.js";

type Tab = "store" | "network" | "fieldLogger";

const ISSUE_LABEL: Record<StoreIssue["kind"], string> = {
  ENTITY_UNDER_CLIENT_ID: "entity under client id",
  ID_FIELD_MISMATCH: "id ≠ record id",
  ID_FIELD_ERROR: "id has field error",
};

export function Inspector() {
  const { environment } = useLab();
  const { storeVersion, exchanges, fieldLogs } = useLabActivity();
  const [tab, setTab] = useState<Tab>("store");
  const [filter, setFilter] = useState("");
  const [entitiesOnly, setEntitiesOnly] = useState(true);

  // Re-read on every render; `storeVersion` in the context changes after each
  // publish, which is what re-renders us.
  void storeVersion;
  const records = environment.getStore().getSource().toJSON() as RecordMap;
  const issues = diagnoseStore(records);
  const issuesByID = new Map<string, StoreIssue[]>();
  for (const issue of issues)
    issuesByID.set(issue.dataID, [...(issuesByID.get(issue.dataID) ?? []), issue]);

  const shown = Object.entries(records).filter(([dataID, record]) => {
    if (filter !== "" && !dataID.toLowerCase().includes(filter.toLowerCase())) return false;
    if (!entitiesOnly) return true;
    return NODE_TYPES.has(String(record?.__typename)) || issuesByID.has(dataID);
  });

  return (
    <aside
      style={{ position: "sticky", top: 16, maxHeight: "calc(100vh - 32px)", overflow: "auto" }}
    >
      <Row>
        {(["store", "network", "fieldLogger"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ fontWeight: tab === t ? 700 : 400 }}>
            {t === "store"
              ? `Store (${Object.keys(records).length})`
              : t === "network"
                ? `Network (${exchanges.length})`
                : `Field logger (${fieldLogs.length})`}
          </button>
        ))}
      </Row>

      {tab === "store" && (
        <>
          <h4 style={{ margin: "0.75rem 0 0.25rem" }}>Diagnostics</h4>
          {issues.length === 0 ? (
            <Note>
              <span style={{ color: colors.ok }}>No id-related problems in the store.</span>
            </Note>
          ) : (
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>
              {issues.map((issue, i) => (
                <li
                  key={i}
                  style={{
                    color: issue.kind === "ID_FIELD_MISMATCH" ? colors.danger : colors.warn,
                  }}
                >
                  <b>{ISSUE_LABEL[issue.kind]}</b> —{" "}
                  <code style={{ fontSize: 11 }}>{issue.dataID}</code>
                </li>
              ))}
            </ul>
          )}
          <h4 style={{ margin: "0.75rem 0 0.25rem" }}>Records</h4>
          <Row>
            <input
              placeholder="filter by id"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <label style={{ fontSize: 13 }}>
              <input
                type="checkbox"
                checked={entitiesOnly}
                onChange={(e) => setEntitiesOnly(e.target.checked)}
              />{" "}
              entities + flagged only
            </label>
          </Row>
          {shown.map(([dataID, record]) => {
            const flagged = issuesByID.has(dataID);
            return (
              <details key={dataID} open={flagged} style={{ margin: "4px 0" }}>
                <summary style={{ fontSize: 12, cursor: "pointer" }}>
                  <code
                    style={{
                      background: flagged ? colors.warnBg : undefined,
                      color: isClientID(dataID) ? colors.muted : undefined,
                    }}
                  >
                    {dataID}
                  </code>{" "}
                  <span style={{ color: colors.muted }}>{String(record?.__typename ?? "")}</span>
                </summary>
                <Json value={record} maxHeight={200} />
              </details>
            );
          })}
        </>
      )}

      {tab === "network" &&
        exchanges.map((e, i) => (
          <details key={exchanges.length - i} open={i === 0} style={{ margin: "6px 0" }}>
            <summary style={{ fontSize: 13, cursor: "pointer" }}>
              <code>onError: {e.onError}</code> {e.operationKind} <b>{e.operationName}</b>
              {"errors" in e.response && e.response.errors ? (
                <span style={{ color: colors.danger }}> · {e.response.errors.length} error(s)</span>
              ) : null}
            </summary>
            <Note>variables</Note>
            <Json value={e.variables} maxHeight={100} />
            <Note>response</Note>
            <Json value={e.response} />
            {e.relayReceived !== e.response && (
              <>
                <Note>what Relay received (after the guard rewrote it)</Note>
                <Json value={e.relayReceived} />
              </>
            )}
          </details>
        ))}

      {tab === "fieldLogger" && <Json value={fieldLogs} maxHeight={2000} />}
    </aside>
  );
}
