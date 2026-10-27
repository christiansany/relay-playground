/**
 * Tiny event log for the 3D lab. Everything that matters for the waterfall
 * (network, chunk downloads, Relay executor events, block commits) is
 * recorded here and rendered by `<EventLog />`.
 *
 * Emitting must never trigger a synchronous React update. `operationLoader.get`
 * runs inside render (DataChecker, reader), so listeners are notified in a
 * microtask, batched.
 */

export type ThreeDEventKind =
  | "network:start"
  | "network:end"
  | "network:replay"
  | "chunk:start"
  | "chunk:end"
  | "chunk:error"
  | "loader:get-miss"
  | "relay"
  | "render"
  | "info";

export type ThreeDEvent = {
  seq: number;
  t: number;
  kind: ThreeDEventKind;
  label: string;
};

const now = () => (typeof performance !== "undefined" ? performance.now() : Date.now());

let events: ThreeDEvent[] = [];
let origin = now();
let seq = 0;
let scheduled = false;
const listeners = new Set<() => void>();

function notify() {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    events = events.slice();
    listeners.forEach((l) => l());
  });
}

export function emit(kind: ThreeDEventKind, label: string) {
  events.push({ seq: seq++, t: Math.round(now() - origin), kind, label });
  notify();
}

/** Clears the log and makes `t = 0` "now". */
export function resetEvents() {
  events = [];
  origin = now();
  notify();
}

export function subscribeEvents(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getEvents(): readonly ThreeDEvent[] {
  return events;
}
