/**
 * Errors on the `id` of a single entity fetched by a root field.
 *
 * The schema declares `id: ID!` (truly non-null) and `productById` as
 * nullable, so:
 * - PROPAGATE: the error on `id` nulls `productById`.
 * - NULL:      `productById` stays an object, with `"id": null`.
 * - HALT:      `data` is null, Relay rejects the whole response.
 */
import { graphql, RelayFeatureFlags } from "relay-runtime";
import { describe, expect, it } from "vitest";
import type { idErrorQueriesCatchQuery } from "./__generated__/idErrorQueriesCatchQuery.graphql.js";
import type { idErrorQueriesNameOnlyQuery } from "./__generated__/idErrorQueriesNameOnlyQuery.graphql.js";
import type { idErrorQueriesNodeQuery } from "./__generated__/idErrorQueriesNodeQuery.graphql.js";
import type { idErrorQueriesProductQuery } from "./__generated__/idErrorQueriesProductQuery.graphql.js";
import type { idErrorQueriesRequiredQuery } from "./__generated__/idErrorQueriesRequiredQuery.graphql.js";
import type { idErrorQueriesRenameMutation } from "./__generated__/idErrorQueriesRenameMutation.graphql.js";
import type { idErrorQueriesThrowingQuery } from "./__generated__/idErrorQueriesThrowingQuery.graphql.js";
import { createHarness, gid, THROWN_FIELD_ERROR } from "./harness.js";

const P1 = gid("Product", "p_1");
const ROOT_LINK = `productById(id:"${P1}")`;
const PATH_CLIENT_ID = `client:root:productById(id:"${P1}")`;

/** Plain read: no @throwOnFieldError, so Relay hands out the nulls. */
const ProductQuery = graphql`
  query idErrorQueriesProductQuery($id: ID!, $err: Boolean!) {
    productById(id: $id) {
      id @simulateError(if: $err)
      name
    }
  }
`;

/** Same selection, but reading throws on any field error (repo convention). */
const ThrowingQuery = graphql`
  query idErrorQueriesThrowingQuery($id: ID!, $err: Boolean!) @throwOnFieldError {
    productById(id: $id) {
      id @simulateError(if: $err)
      name
    }
  }
`;

/**
 * Errors on `id` while a *different* reader only selects `name`. The
 * normalization AST still selects `id` (Relay adds it), the reader doesn't.
 */
const NameOnlyQuery = graphql`
  query idErrorQueriesNameOnlyQuery($id: ID!) @throwOnFieldError {
    productById(id: $id) {
      name
    }
  }
`;

const CatchQuery = graphql`
  query idErrorQueriesCatchQuery($id: ID!, $err: Boolean!) {
    productById(id: $id) @catch(to: RESULT) {
      id @simulateError(if: $err) @catch(to: RESULT)
      name
    }
  }
`;

/** The compiler accepts @required on a non-null field (no warning in 21.0.1). */
const RequiredQuery = graphql`
  query idErrorQueriesRequiredQuery($id: ID!, $err: Boolean!) {
    productById(id: $id) {
      id @simulateError(if: $err) @required(action: THROW)
      name
    }
  }
`;

const NodeQuery = graphql`
  query idErrorQueriesNodeQuery($id: ID!) {
    node(id: $id) {
      id
      ... on Product {
        name
      }
    }
  }
`;

const RenameMutation = graphql`
  mutation idErrorQueriesRenameMutation($input: RenameProductInput!) {
    renameProduct(input: $input) {
      product {
        id
        name
      }
    }
  }
`;

async function primed(onError: "PROPAGATE" | "NULL" | "HALT") {
  const h = createHarness({ onError });
  await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: false });
  expect(h.record("client:root")?.[ROOT_LINK]).toEqual({ __ref: P1 });
  return h;
}

describe("refetching an entity whose id now errors (store already has it)", () => {
  it("PROPAGATE: the root link is set to null + error; the entity record is untouched", async () => {
    const h = await primed("PROPAGATE");
    const result = await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });

    expect(h.lastResponse()).toMatchObject({
      data: { productById: null },
      errors: [{ path: ["productById", "id"], pathNonNull: [false, true] }],
    });
    expect(result.data.productById).toBeNull();
    // The error is stored on the *parent* field, with the rest of the path kept.
    expect(h.record("client:root")).toMatchInlineSnapshot(`
      {
        "__errors": {
          "productById(id:"UHJvZHVjdDpwXzE=")": [
            {
              "extensions": {
                "code": "SIMULATED_ERROR",
              },
              "message": "Simulated error via @simulateError directive",
              "path": [
                "id",
              ],
              "pathNonNull": [
                false,
                true,
              ],
            },
          ],
        },
        "__id": "client:root",
        "__typename": "__Root",
        "productById(id:"UHJvZHVjdDpwXzE=")": null,
      }
    `);
    expect(h.record(P1)).toEqual({
      __id: P1,
      __typename: "Product",
      id: P1,
      name: "Beverages item 001",
    });
    expect(h.issues()).toEqual([]);
  });

  it("NULL: the root link is re-pointed to a new path-derived client record; the entity record is untouched", async () => {
    const h = await primed("NULL");
    const result = await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });

    expect(h.lastResponse()).toMatchObject({
      data: { productById: { id: null, name: "Beverages item 001" } },
      errors: [{ path: ["productById", "id"] }],
    });
    // Relay normalizes each response into a fresh record source, so there is
    // no "previous link" to fall back to: getDataID() returned null, and the
    // normalizer generated a client id from the parent id + storage key.
    expect(h.record("client:root")?.[ROOT_LINK]).toEqual({ __ref: PATH_CLIENT_ID });
    expect(h.record(PATH_CLIENT_ID)).toMatchInlineSnapshot(`
      {
        "__errors": {
          "id": [
            {
              "extensions": {
                "code": "SIMULATED_ERROR",
              },
              "message": "Simulated error via @simulateError directive",
              "pathNonNull": [
                false,
                true,
              ],
            },
          ],
        },
        "__id": "client:root:productById(id:"UHJvZHVjdDpwXzE=")",
        "__typename": "Product",
        "id": null,
        "name": "Beverages item 001",
      }
    `);
    // The real record is still there and still correct, it's just no longer
    // what this query points at.
    expect(h.record(P1)?.id).toBe(P1);
    expect(result.data.productById).toEqual({ id: null, name: "Beverages item 001" });
    expect(h.issues().map((i) => i.kind)).toEqual(["ID_FIELD_ERROR", "ENTITY_UNDER_CLIENT_ID"]);
  });

  it("HALT: the response has no data, Relay errors the request and leaves the store alone", async () => {
    const h = await primed("HALT");
    const before = h.records();
    const result = await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });

    expect(h.lastResponse()).toMatchObject({
      data: null,
      errors: [{ path: ["productById", "id"] }],
    });
    expect(result.networkError?.message).toMatch(
      /No data returned for operation `idErrorQueriesProductQuery`/,
    );
    expect(h.records()).toEqual(before);
    // Readers keep seeing the last good data.
    expect(result.data.productById).toEqual({ id: P1, name: "Beverages item 001" });
  });
});

describe("what the component sees", () => {
  it.each(["PROPAGATE", "NULL"] as const)(
    "%s + @throwOnFieldError: reading throws",
    async (onError) => {
      const h = createHarness({ onError });
      const result = await h.query<idErrorQueriesThrowingQuery>(ThrowingQuery, {
        id: P1,
        err: true,
      });
      expect(result.readError).toMatch(THROWN_FIELD_ERROR);
    },
  );

  it("NULL + @throwOnFieldError on a reader that does not select `id`: nothing throws, it renders the client-record copy", async () => {
    const h = createHarness({ onError: "NULL" });
    await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    // Another component reads the same root field (same storage key, so the
    // same client record) but only selects `name`.
    const view = h.lookup<idErrorQueriesNameOnlyQuery>(NameOnlyQuery, { id: P1 });
    expect(view.readError).toBeNull();
    expect(view.data.productById).toEqual({ name: "Beverages item 001" });
  });

  it("NULL without @throwOnFieldError: `id` is null although the generated type says `string`; the field logger gets an event", async () => {
    const h = createHarness({ onError: "NULL" });
    const result = await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    const id: string = result.data.productById!.id; // typed as string...
    expect(id).toBeNull(); // ...but isn't
    expect(h.fieldLogs).toMatchInlineSnapshot(`
      [
        {
          "error": {
            "extensions": {
              "code": "SIMULATED_ERROR",
            },
            "message": "Simulated error via @simulateError directive",
            "pathNonNull": [
              false,
              true,
            ],
          },
          "fieldPath": "",
          "handled": false,
          "kind": "relay_field_payload.error",
          "owner": "idErrorQueriesProductQuery",
          "shouldThrow": false,
          "uiContext": undefined,
        },
      ]
    `);
  });

  it("the field error's fieldPath is '' under NULL (error on the leaf) and 'id' under PROPAGATE (error below a nulled parent)", async () => {
    // Relay derives fieldPath from the *remaining* error path at the field
    // where it stored the error. Under NULL the error is stored on `id`
    // itself, the remainder is empty, and the field name is lost - in the
    // field logger and (on Relay main) in the thrown message.
    const nul = createHarness({ onError: "NULL" });
    await nul.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    const propagate = createHarness({ onError: "PROPAGATE" });
    await propagate.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    const fieldPaths = (h: typeof nul) =>
      h.fieldLogs.map((e) => ("fieldPath" in e ? e.fieldPath : undefined));
    expect(fieldPaths(nul)).toEqual([""]);
    expect(fieldPaths(propagate)).toEqual(["id"]);
  });

  it("NULL + @required(action: THROW) on id: throws 'Missing @required value' (and the field error is logged)", async () => {
    const h = createHarness({ onError: "NULL" });
    const r = await h.query<idErrorQueriesRequiredQuery>(RequiredQuery, { id: P1, err: true });
    expect(r.readError).toMatch(/Missing @required value at path 'productById.id'/);
  });

  it("PROPAGATE + @required(action: THROW) on id: does not fire, productById itself is null", async () => {
    const h = createHarness({ onError: "PROPAGATE" });
    const r = await h.query<idErrorQueriesRequiredQuery>(RequiredQuery, { id: P1, err: true });
    expect(r.readError).toBeNull();
    expect(r.data.productById).toBeNull();
  });

  it("PROPAGATE / NULL with @catch: the error is a value", async () => {
    const propagate = createHarness({ onError: "PROPAGATE" });
    const p = await propagate.query<idErrorQueriesCatchQuery>(CatchQuery, { id: P1, err: true });
    expect(p.readError).toBeNull();
    expect(p.data.productById).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "extensions": {
              "code": "SIMULATED_ERROR",
            },
            "path": [
              "id",
            ],
            "pathNonNull": [
              false,
              true,
            ],
          },
        ],
        "ok": false,
      }
    `);

    const nul = createHarness({ onError: "NULL" });
    const n = await nul.query<idErrorQueriesCatchQuery>(CatchQuery, { id: P1, err: true });
    expect(n.readError).toBeNull();
    expect(n.data.productById).toMatchInlineSnapshot(`
      {
        "errors": [
          {
            "extensions": {
              "code": "SIMULATED_ERROR",
            },
            "pathNonNull": [
              false,
              true,
            ],
          },
        ],
        "ok": false,
      }
    `);
  });
});

describe("nested @catch: `productById @catch { id @catch }` (facebook/relay#5339)", () => {
  // Above, the outer @catch reports ok: false under NULL even though the
  // only error sits on `id`, whose own @catch handled it. Upstream Relay has
  // a flag that makes handled errors invisible to outer @catch boundaries.
  const flags = RelayFeatureFlags as unknown as Record<string, boolean>;
  const FLAG = "ENABLE_CATCH_IGNORE_HANDLED_FIELD_ERRORS";

  it.runIf(FLAG in flags)(`NULL + ${FLAG}: outer ok: true, inner id ok: false`, async () => {
    flags[FLAG] = true;
    try {
      const h = createHarness({ onError: "NULL" });
      const r = await h.query<idErrorQueriesCatchQuery>(CatchQuery, { id: P1, err: true });
      expect(r.data.productById).toMatchObject({
        ok: true,
        value: { id: { ok: false }, name: "Beverages item 001" },
      });
    } finally {
      flags[FLAG] = false;
    }
  });
});

describe("the errored state is cached", () => {
  it.each(["PROPAGATE", "NULL"] as const)(
    "%s: environment.check() reports the errored query as available, so store-or-network / store-only render it without refetching",
    async (onError) => {
      const h = createHarness({ onError });
      const { operation } = await h.query<idErrorQueriesProductQuery>(ProductQuery, {
        id: P1,
        err: true,
      });
      expect(h.environment.check(operation)).toMatchObject({ status: "available" });
    },
  );

  it("NULL: node(id:) for the same id is a cache miss: the entity record was never written", async () => {
    const h = createHarness({ onError: "NULL" });
    await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    expect(h.lookup<idErrorQueriesNodeQuery>(NodeQuery, { id: P1 }).availability).toMatchObject({
      status: "missing",
    });
  });
});

describe("entity first seen with an errored id, later fetched cleanly", () => {
  it("NULL: the clean fetch re-links to the real record; the client copy becomes garbage", async () => {
    const h = createHarness({ onError: "NULL" });
    await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    expect(h.record(P1)).toBeUndefined();
    await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: false });
    expect(h.record("client:root")?.[ROOT_LINK]).toEqual({ __ref: P1 });
    expect(h.record(P1)?.id).toBe(P1);
    // The orphan is still in the source until GC runs.
    expect(h.record(PATH_CLIENT_ID)).toBeDefined();
  });
});

describe("the copy is disconnected from normalization", () => {
  it("NULL: a later rename of the entity does not reach the view that holds the copy", async () => {
    const h = createHarness({ onError: "NULL" });
    // View A: the product page, fetched while `id` errored.
    const viewA = await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    // Elsewhere the entity is loaded normally (e.g. a list) ...
    await h.query<idErrorQueriesNodeQuery>(NodeQuery, { id: P1 });
    // ... and renamed.
    const rename = await h.mutate<idErrorQueriesRenameMutation>(RenameMutation, {
      variables: { input: { id: P1, name: "Renamed" } },
    });
    expect(rename.errors).toBeNull();
    expect(h.record(P1)?.name).toBe("Renamed");
    // View A still shows the old name: it reads the client record.
    expect(h.read<idErrorQueriesProductQuery>(viewA.operation).data.productById?.name).toBe(
      "Beverages item 001",
    );
  });

  it("PROPAGATE: same flow, view A shows null (and throws with @throwOnFieldError) until it refetches", async () => {
    const h = createHarness({ onError: "PROPAGATE" });
    const viewA = await h.query<idErrorQueriesProductQuery>(ProductQuery, { id: P1, err: true });
    await h.query<idErrorQueriesNodeQuery>(NodeQuery, { id: P1 });
    await h.mutate<idErrorQueriesRenameMutation>(RenameMutation, {
      variables: { input: { id: P1, name: "Renamed" } },
    });
    expect(h.read<idErrorQueriesProductQuery>(viewA.operation).data.productById).toBeNull();
  });
});
