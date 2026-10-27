import { Component, Suspense, type CSSProperties, type ReactNode } from "react";

export const colors = {
  border: "#d0d7de",
  muted: "#57606a",
  bg: "#f6f8fa",
  danger: "#cf222e",
  dangerBg: "#ffebe9",
  warn: "#9a6700",
  warnBg: "#fff8c5",
  ok: "#1a7f37",
};

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      style={{
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        padding: "0.75rem 1rem",
        marginBottom: "1rem",
      }}
    >
      <h3 style={{ margin: "0 0 0.5rem" }}>{title}</h3>
      {children}
    </section>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div style={{ color: colors.muted, fontSize: 13, margin: "0.25rem 0 0.5rem" }}>{children}</div>
  );
}

export function Row({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", ...style }}>
      {children}
    </div>
  );
}

export function Json({ value, maxHeight = 240 }: { value: unknown; maxHeight?: number }) {
  return (
    <pre
      style={{
        background: colors.bg,
        padding: 8,
        borderRadius: 6,
        fontSize: 12,
        maxHeight,
        overflow: "auto",
        margin: "0.25rem 0",
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

/**
 * Shown while a click-triggered load is in flight. Scenarios load inside
 * `startTransition`, so the current view stays on screen instead of
 * flashing the Suspense fallback.
 *
 * Scenarios fetch with `useQueryLoader` from the click handler, not
 * `useLazyLoadQuery`: under StrictMode (and whenever Suspense hides and
 * re-reveals a tree) `useLazyLoadQuery` force-updates with a new cache key,
 * which for `network-only` sends the request a second time and re-suspends.
 */
export function Pending({ show }: { show: boolean }) {
  return show ? <em style={{ color: colors.muted, fontSize: 13 }}>fetching…</em> : null;
}

/** A labelled box for one "view" (component) inside a scenario. */
export function View({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      style={{
        flex: "1 1 260px",
        minWidth: 0,
        border: `1px dashed ${colors.border}`,
        borderRadius: 6,
        padding: 8,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: colors.muted, marginBottom: 4 }}>
        {label}
      </div>
      <LabErrorBoundary>
        <Suspense fallback={<em>loading…</em>}>{children}</Suspense>
      </LabErrorBoundary>
    </div>
  );
}

type BoundaryState = { error: Error | null };

/** Error boundary that shows the message and can be reset in place. */
export class LabErrorBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): BoundaryState {
    return { error };
  }

  render(): ReactNode {
    if (this.state.error == null) return this.props.children;
    return (
      <div
        style={{
          background: colors.dangerBg,
          color: colors.danger,
          padding: 8,
          borderRadius: 6,
          fontSize: 13,
        }}
      >
        <strong>Error boundary:</strong> {this.state.error.message}{" "}
        <button onClick={() => this.setState({ error: null })}>reset</button>
      </div>
    );
  }
}

/** Highlights a value that should never be what it is (e.g. an `id` of null). */
export function Value({ value }: { value: unknown }) {
  const bad = value === null || value === undefined;
  return (
    <code
      style={
        bad ? { background: colors.dangerBg, color: colors.danger, padding: "0 4px" } : undefined
      }
    >
      {JSON.stringify(value)}
    </code>
  );
}

/** Shows which store record a view is reading, flagging client ids for entities. */
export function RecordID({ dataID }: { dataID: string | null | undefined }) {
  const client = dataID?.startsWith("client:") ?? false;
  return (
    <code
      title={client ? "client id: this entity is not normalized" : "server id"}
      style={{
        fontSize: 11,
        padding: "0 4px",
        background: client ? colors.warnBg : colors.bg,
        color: client ? colors.warn : colors.muted,
      }}
    >
      {dataID ?? "∅"}
    </code>
  );
}
