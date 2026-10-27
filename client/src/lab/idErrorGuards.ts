import type { GraphQLResponse } from "relay-runtime";

/**
 * Two client-side mitigations for errors on `id` under `onError: "NULL"`.
 * See `docs/error-behaviors-and-relay-ids.md` for why they are needed.
 */

type PayloadError = {
  message: string;
  path?: ReadonlyArray<string | number>;
  pathNonNull?: ReadonlyArray<boolean>;
};

type Container = Record<string | number, unknown>;

function getAt(root: unknown, path: ReadonlyArray<string | number>): unknown {
  let current = root;
  for (const segment of path) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Container)[segment];
  }
  return current;
}

/**
 * Mitigation A: re-create `PROPAGATE` for `id` errors only.
 *
 * Uses the proposal's `pathNonNull` to walk up from an errored `id` to the
 * nearest nullable position and nulls it, which is exactly what the server
 * would have done under `PROPAGATE`. Every other error stays in place
 * (`NULL` semantics). Relay then never sees an object without an id, so it
 * never has to guess which record the object belongs to.
 *
 * If `pathNonNull` is missing, the object that holds the `id` is nulled
 * (the parent position is assumed to be nullable).
 */
export function propagateIdErrors(
  response: GraphQLResponse,
  isIdField: (responseKey: string) => boolean = (key) => key === "id",
): GraphQLResponse {
  if (Array.isArray(response)) {
    return response.map((r) => propagateIdErrors(r, isIdField)) as unknown as GraphQLResponse;
  }
  const errors = (response as { errors?: ReadonlyArray<PayloadError> }).errors;
  const data = (response as { data?: unknown }).data;
  if (errors == null || data == null) return response;

  let nextData: unknown = data;
  let cloned = false;
  for (const error of errors) {
    const path = error.path;
    if (path == null || path.length < 2) continue;
    const last = path[path.length - 1];
    if (typeof last !== "string" || !isIdField(last)) continue;
    if (getAt(nextData, path) !== null) continue; // not an error-null (or already gone)

    // Index of the position to null: the nearest nullable ancestor of `id`.
    let target = path.length - 2;
    if (error.pathNonNull != null) {
      while (target >= 0 && error.pathNonNull[target] === true) target--;
    }
    if (!cloned) {
      nextData = structuredClone(nextData);
      cloned = true;
    }
    if (target < 0) {
      nextData = null;
      break;
    }
    const parent = getAt(nextData, path.slice(0, target));
    if (parent != null && typeof parent === "object") {
      (parent as Container)[path[target]!] = null;
    }
  }
  return cloned ? ({ ...response, data: nextData } as GraphQLResponse) : response;
}

/**
 * Mitigation B: a `getDataID` that never lets Relay reuse a record for an
 * object whose `id` came back as an error-null.
 *
 * Relay's normalizer does `getDataID(obj) || previousLinkedID || clientID`.
 * Returning a fresh client id for `id === null` short-circuits the reuse of
 * the previously linked record (or the record that used to sit at the same
 * list index). The object's other fields are kept, in a throwaway record
 * that nothing else points at. `id === undefined` (not selected) keeps the
 * default behavior.
 */
export function createNullIdSafeGetDataID(): (
  fieldValue: { readonly [key: string]: unknown },
  typeName: string,
) => unknown {
  let counter = 0;
  return (fieldValue, typeName) => {
    if (typeName === "Viewer") return fieldValue.id == null ? "client:root:viewer" : fieldValue.id;
    if (fieldValue.id === null) {
      counter += 1;
      return `client:errored-id:${typeName}:${counter}`;
    }
    return fieldValue.id;
  };
}
