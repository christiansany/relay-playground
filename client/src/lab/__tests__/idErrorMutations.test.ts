/**
 * Errors on `id` inside mutation payloads.
 *
 * commitMutation() gives every execution its own root record
 * (`client:local:<n>`), so when a payload entity comes back without an id,
 * its client record id is `client:local:<n>:renameProduct(input:{...}):product`:
 * unique per execution, never shared with the entity or another mutation.
 *
 * In every error mode the server-side effect has already happened when the
 * error is raised, so the client is left out of sync with the server.
 */
import { ConnectionHandler, graphql, type RecordSourceSelectorProxy } from "relay-runtime";
import { describe, expect, it } from "vitest";
import type { idErrorMutationsCreateMutation } from "./__generated__/idErrorMutationsCreateMutation.graphql.js";
import type { idErrorMutationsDeleteMutation } from "./__generated__/idErrorMutationsDeleteMutation.graphql.js";
import type { idErrorMutationsListQuery } from "./__generated__/idErrorMutationsListQuery.graphql.js";
import type { idErrorMutations_products$data } from "./__generated__/idErrorMutations_products.graphql.js";
import type { idErrorMutationsProductQuery } from "./__generated__/idErrorMutationsProductQuery.graphql.js";
import type { idErrorMutationsRenameMutation } from "./__generated__/idErrorMutationsRenameMutation.graphql.js";
import type { idErrorMutationsRenameThrowingMutation } from "./__generated__/idErrorMutationsRenameThrowingMutation.graphql.js";
import { createHarness, gid, stableClientID, THROWN_FIELD_ERROR, type Harness } from "./harness.js";

const P1 = gid("Product", "p_1");
const PT1 = gid("ProductType", "pt_1");
const OLD_NAME = "Beverages item 001";

const ProductQuery = graphql`
  query idErrorMutationsProductQuery($id: ID!) {
    productById(id: $id) {
      id
      name
    }
  }
`;

const ListQuery = graphql`
  query idErrorMutationsListQuery($id: ID!) {
    productTypeById(id: $id) {
      ...idErrorMutations_products
    }
  }
`;

const ProductsFragment = graphql`
  fragment idErrorMutations_products on ProductType {
    products(first: 3) @connection(key: "idErrorMutations_products") {
      __id
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const RenameMutation = graphql`
  mutation idErrorMutationsRenameMutation($input: RenameProductInput!, $err: Boolean!) {
    renameProduct(input: $input) {
      product {
        id @simulateError(if: $err)
        name
      }
    }
  }
`;

/**
 * `@throwOnFieldError` is rejected on mutations by the compiler ("Supported
 * location(s): QUERY, FRAGMENT_DEFINITION"), so the payload is read through
 * a fragment that carries it.
 */
const RenameThrowingMutation = graphql`
  mutation idErrorMutationsRenameThrowingMutation($input: RenameProductInput!, $err: Boolean!) {
    renameProduct(input: $input) {
      product {
        id @simulateError(if: $err)
        ...idErrorMutations_renamedProduct
      }
    }
  }
`;

const RenamedProductFragment = graphql`
  fragment idErrorMutations_renamedProduct on Product @throwOnFieldError {
    id
    name
  }
`;

const DeleteMutation = graphql`
  mutation idErrorMutationsDeleteMutation(
    $input: DeleteProductInput!
    $connections: [ID!]!
    $err: Boolean!
  ) {
    deleteProduct(input: $input) {
      # Two selections on purpose: with "@deleteRecord @deleteEdge" on one
      # field the compiler silently emits only the first handle.
      deletedProductId @deleteEdge(connections: $connections) @simulateError(if: $err)
      deletedId: deletedProductId @deleteRecord @simulateError(if: $err)
    }
  }
`;

const CreateMutation = graphql`
  mutation idErrorMutationsCreateMutation(
    $input: CreateProductInput!
    $connections: [ID!]!
    $err: Boolean!
  ) {
    createProduct(input: $input) {
      productEdge @appendEdge(connections: $connections) {
        cursor
        node {
          id @simulateError(if: $err)
          name
        }
      }
    }
  }
`;

async function primeProduct(h: Harness) {
  return h.query<idErrorMutationsProductQuery>(ProductQuery, { id: P1 });
}

async function serverName(h: Harness) {
  const r = await h.query<idErrorMutationsProductQuery>(
    ProductQuery,
    { id: P1 },
    { onError: "PROPAGATE" },
  );
  return r.data.productById?.name;
}

function renameVars(err: boolean) {
  return { input: { id: P1, name: "Renamed" }, err };
}

describe("rename: the payload entity's id errors", () => {
  it("baseline (no error): the entity record is updated in place", async () => {
    const h = createHarness({ onError: "NULL" });
    await primeProduct(h);
    const r = await h.mutate<idErrorMutationsRenameMutation>(RenameMutation, {
      variables: renameVars(false),
    });
    expect(r.errors).toBeNull();
    expect(h.record(P1)?.name).toBe("Renamed");
  });

  it("PROPAGATE: onCompleted(data with product: null, errors); the entity keeps its old name", async () => {
    const h = createHarness({ onError: "PROPAGATE" });
    await primeProduct(h);
    const r = await h.mutate<idErrorMutationsRenameMutation>(RenameMutation, {
      variables: renameVars(true),
    });
    expect(r.error).toBeNull();
    expect(r.data).toEqual({ renameProduct: { product: null } });
    expect(r.errors).toHaveLength(1);
    expect(h.record(P1)?.name).toBe(OLD_NAME);
    expect(await serverName(h)).toBe("Renamed"); // the server did rename
  });

  it("NULL: onCompleted gets the new name with id: null; it is written to an input-derived client record, not to the entity", async () => {
    const h = createHarness({ onError: "NULL" });
    await primeProduct(h);
    const r = await h.mutate<idErrorMutationsRenameMutation>(RenameMutation, {
      variables: renameVars(true),
    });
    expect(r.error).toBeNull();
    expect(r.data).toEqual({ renameProduct: { product: { id: null, name: "Renamed" } } });
    expect(r.errors).toHaveLength(1);
    expect(h.record(P1)?.name).toBe(OLD_NAME);
    expect(h.issues().map((i) => i.dataID)).toMatchInlineSnapshot(`
      [
        "client:local:<n>:renameProduct(input:{"id":"UHJvZHVjdDpwXzE=","name":"Renamed"}):product",
        "client:local:<n>:renameProduct(input:{"id":"UHJvZHVjdDpwXzE=","name":"Renamed"}):product",
      ]
    `);
  });

  it("HALT: onError fires and nothing is written, but the server did rename", async () => {
    const h = createHarness({ onError: "HALT" });
    await primeProduct(h);
    const r = await h.mutate<idErrorMutationsRenameMutation>(RenameMutation, {
      variables: renameVars(true),
    });
    expect(r.error?.message).toMatch(
      /No data returned for operation `idErrorMutationsRenameMutation`/,
    );
    expect(h.record(P1)?.name).toBe(OLD_NAME);
    expect(await serverName(h)).toBe("Renamed");
  });

  it("NULL: onCompleted itself never throws; a @throwOnFieldError fragment spread in the payload throws when read", async () => {
    const h = createHarness({ onError: "NULL" });
    const r = await h.mutate<idErrorMutationsRenameThrowingMutation>(RenameThrowingMutation, {
      variables: renameVars(true),
    });
    expect(r.error).toBeNull();
    expect(r.data?.renameProduct?.product?.id).toBeNull();
    const fragment = h.readFragment(RenamedProductFragment, r.data?.renameProduct?.product);
    expect(fragment.readError).toMatch(THROWN_FIELD_ERROR);
  });
});

describe("rename with an optimistic response", () => {
  async function renameOptimistically(onError: "PROPAGATE" | "NULL" | "HALT") {
    const h = createHarness({ onError });
    const { snapshot } = await primeProduct(h);
    const seen: Array<string | null | undefined> = [];
    h.environment.subscribe(snapshot, (next) =>
      seen.push((next.data as idErrorMutationsProductQuery["response"]).productById?.name),
    );
    const result = await h.mutate<idErrorMutationsRenameMutation>(RenameMutation, {
      variables: renameVars(true),
      optimisticResponse: { renameProduct: { product: { id: P1, name: "Renamed" } } },
    });
    return { h, seen, result };
  }

  it.each(["PROPAGATE", "NULL", "HALT"] as const)(
    "%s: the optimistic name shows, then is rolled back to the old name although the server renamed",
    async (onError) => {
      const { h, seen } = await renameOptimistically(onError);
      expect(seen).toEqual(["Renamed", OLD_NAME]);
      expect(h.record(P1)?.name).toBe(OLD_NAME);
      expect(await serverName(h)).toBe("Renamed");
    },
  );
});

describe("updater functions", () => {
  it("NULL: the updater sees the payload record under a client id, with id null and the error attached", async () => {
    const h = createHarness({ onError: "NULL" });
    await primeProduct(h);
    let seen: unknown;
    await h.mutate<idErrorMutationsRenameMutation>(RenameMutation, {
      variables: renameVars(true),
      updater: (store: RecordSourceSelectorProxy) => {
        const product = store.getRootField("renameProduct")?.getLinkedRecord("product");
        seen = {
          dataID: stableClientID(product?.getDataID() ?? ""),
          id: product?.getValue("id"),
          // RecordProxy#getErrors exists at runtime; @types/relay-runtime lacks it.
          idErrors: (
            product as unknown as { getErrors(name: string): { message: string }[] | undefined }
          )
            ?.getErrors("id")
            ?.map((e) => e.message),
          // The usual "find the entity by the id from the payload" step:
          entityById: store.get(product?.getValue("id") as string)?.getDataID() ?? null,
        };
      },
    });
    expect(seen).toMatchInlineSnapshot(`
      {
        "dataID": "client:local:<n>:renameProduct(input:{"id":"UHJvZHVjdDpwXzE=","name":"Renamed"}):product",
        "entityById": null,
        "id": null,
        "idErrors": [
          "Simulated error via @simulateError directive",
        ],
      }
    `);
  });
});

describe("delete with @deleteRecord / @deleteEdge", () => {
  async function setup(onError: "PROPAGATE" | "NULL" | "HALT") {
    const h = createHarness({ onError });
    const list = await h.query<idErrorMutationsListQuery>(ListQuery, { id: PT1 });
    await primeProduct(h);
    const connectionID = ConnectionHandler.getConnectionID(PT1, "idErrorMutations_products");
    const names = () =>
      h
        .readFragment<idErrorMutations_products$data>(ProductsFragment, list.data.productTypeById)
        .data.products?.edges?.map((e) => e?.node?.name ?? null);
    return { h, connectionID, names };
  }

  it("baseline (no error): the record is deleted and the edge removed", async () => {
    const { h, connectionID, names } = await setup("NULL");
    await h.mutate<idErrorMutationsDeleteMutation>(DeleteMutation, {
      variables: { input: { id: P1 }, connections: [connectionID], err: false },
    });
    expect(h.record(P1)).toBeNull();
    expect(names()).toEqual(["Beverages item 002", "Beverages item 003"]);
  });

  it.each(["PROPAGATE", "NULL", "HALT"] as const)(
    "%s: nothing is deleted on the client, the server deleted it",
    async (onError) => {
      const { h, connectionID, names } = await setup(onError);
      const r = await h.mutate<idErrorMutationsDeleteMutation>(DeleteMutation, {
        variables: { input: { id: P1 }, connections: [connectionID], err: true },
      });
      if (onError === "HALT") expect(r.error).not.toBeNull();
      // PROPAGATE nulls `deleteProduct` at the first error and skips the sibling.
      else expect(r.errors).toHaveLength(onError === "NULL" ? 2 : 1);
      expect(h.record(P1)?.name).toBe(OLD_NAME);
      expect(names()).toEqual([OLD_NAME, "Beverages item 002", "Beverages item 003"]);
      const refetch = await h.query<idErrorMutationsProductQuery>(
        ProductQuery,
        { id: P1 },
        { onError: "PROPAGATE" },
      );
      expect(refetch.data.productById).toBeNull();
    },
  );
});

describe("create with @appendEdge", () => {
  async function setup(onError: "PROPAGATE" | "NULL" | "HALT") {
    const h = createHarness({ onError });
    const list = await h.query<idErrorMutationsListQuery>(ListQuery, { id: PT1 });
    const connectionID = ConnectionHandler.getConnectionID(PT1, "idErrorMutations_products");
    const edges = () =>
      h.readFragment<idErrorMutations_products$data>(ProductsFragment, list.data.productTypeById)
        .data.products?.edges;
    const create = (name: string, err: boolean) =>
      h.mutate<idErrorMutationsCreateMutation>(CreateMutation, {
        variables: {
          input: { productTypeId: PT1, name, price: 1 },
          connections: [connectionID],
          err,
        },
      });
    return { h, edges, create };
  }

  it("baseline (no error): the new edge points at the new entity", async () => {
    const { edges, create } = await setup("NULL");
    await create("New", false);
    expect(edges()?.at(-1)?.node).toMatchObject({ id: gid("Product", "p_new_1"), name: "New" });
  });

  it("PROPAGATE: productEdge.node is null, @appendEdge skips it: the new item never shows up", async () => {
    const { edges, create } = await setup("PROPAGATE");
    const r = await create("New", true);
    expect(r.data).toMatchObject({ createProduct: { productEdge: { node: null } } });
    expect(edges()).toHaveLength(3);
  });

  it("NULL: the edge is appended, its node is a per-execution client record with id null", async () => {
    const { h, edges, create } = await setup("NULL");
    await create("New", true);
    expect(edges()).toHaveLength(4);
    expect(edges()?.at(-1)?.node).toMatchObject({ id: null, name: "New" });
    expect(h.issues().map((i) => i.dataID)).toMatchInlineSnapshot(`
      [
        "client:local:<n>:createProduct(input:{"name":"New","price":1,"productTypeId":"UHJvZHVjdFR5cGU6cHRfMQ=="}):productEdge:node",
        "client:local:<n>:createProduct(input:{"name":"New","price":1,"productTypeId":"UHJvZHVjdFR5cGU6cHRfMQ=="}):productEdge:node",
      ]
    `);
  });

  it("NULL: creating two products with the same input appends two edges (each execution has its own root, so no dedupe)", async () => {
    const { edges, create } = await setup("NULL");
    await create("Same", true);
    await create("Same", true);
    expect(edges()?.map((e) => e?.node?.name)).toEqual([
      "Beverages item 001",
      "Beverages item 002",
      "Beverages item 003",
      "Same",
      "Same",
    ]);
  });

  it("NULL: the appended copy does not follow later updates of the entity", async () => {
    const { h, edges, create } = await setup("NULL");
    await create("New", true);
    // The created product is p_new_1; rename it through its real id.
    await h.mutate<idErrorMutationsRenameMutation>(RenameMutation, {
      variables: { input: { id: gid("Product", "p_new_1"), name: "New (renamed)" }, err: false },
    });
    expect(h.record(gid("Product", "p_new_1"))?.name).toBe("New (renamed)");
    expect(edges()?.at(-1)?.node?.name).toBe("New");
  });

  it("HALT: nothing is appended, onError fires, the server created the product", async () => {
    const { edges, create } = await setup("HALT");
    const r = await create("New", true);
    expect(r.error).not.toBeNull();
    expect(edges()).toHaveLength(3);
  });
});
