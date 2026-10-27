/**
 * Client-side mitigations for `id` errors under `onError: "NULL"`
 * (see ../idErrorGuards.ts):
 *
 * A. `propagateIdErrors`: rewrite the response so an errored `id` nulls the
 *    nearest nullable ancestor (PROPAGATE semantics, using `pathNonNull`).
 *    Errors on any other field keep NULL semantics.
 * B. `nullIdSafeGetDataID`: give objects with an error-null `id` a fresh
 *    client id, so positional/path-derived ids are never shared.
 */
import type { GraphQLResponse } from "relay-runtime";
import { graphql } from "relay-runtime";
import { describe, expect, it } from "vitest";
import { propagateIdErrors } from "../idErrorGuards.js";
import type { idErrorGuardsProductQuery } from "./__generated__/idErrorGuardsProductQuery.graphql.js";
import type { idErrorGuardsRenameMutation } from "./__generated__/idErrorGuardsRenameMutation.graphql.js";
import type { idErrorGuardsSectorsQuery } from "./__generated__/idErrorGuardsSectorsQuery.graphql.js";
import type { idErrorGuardsSetOrderMutation } from "./__generated__/idErrorGuardsSetOrderMutation.graphql.js";
import type { idErrorGuardsSectorsWithSlugQuery } from "./__generated__/idErrorGuardsSectorsWithSlugQuery.graphql.js";
import type { idErrorGuards_sector$data } from "./__generated__/idErrorGuards_sector.graphql.js";
import { createHarness, gid, type Harness } from "./harness.js";

const P1 = gid("Product", "p_1");
const SEC = (n: number) => gid("Sector", `sec_${n}`);

describe("propagateIdErrors (unit)", () => {
  const error = (path: (string | number)[], pathNonNull?: boolean[]) => ({
    message: "boom",
    path,
    ...(pathNonNull ? { pathNonNull } : {}),
  });

  it("nulls the object holding the errored id when that position is nullable", () => {
    const response = {
      data: { a: { id: null, name: "x" }, b: { id: "1" } },
      errors: [error(["a", "id"], [false, true])],
    } as GraphQLResponse;
    expect(propagateIdErrors(response)).toEqual({ ...response, data: { a: null, b: { id: "1" } } });
  });

  it("keeps walking up through non-null positions", () => {
    const response = {
      data: { list: [{ edge: { node: { id: null } } }, { edge: { node: { id: "2" } } }] },
      // list: [Item!], Item.edge: Edge!, Edge.node: Node!, Node.id: ID!
      errors: [error(["list", 0, "edge", "node", "id"], [false, true, true, true, true])],
    } as GraphQLResponse;
    expect((propagateIdErrors(response) as { data: unknown }).data).toEqual({ list: null });
  });

  it("nulls data when everything up to the root is non-null", () => {
    const response = {
      data: { a: { id: null } },
      errors: [error(["a", "id"], [true, true])],
    } as GraphQLResponse;
    expect((propagateIdErrors(response) as { data: unknown }).data).toBeNull();
  });

  it("leaves errors on other fields alone (NULL semantics)", () => {
    const response = {
      data: { a: { id: "1", name: null } },
      errors: [error(["a", "name"], [false, false])],
    } as GraphQLResponse;
    expect(propagateIdErrors(response)).toBe(response);
  });

  it("without pathNonNull, assumes the holder is nullable", () => {
    const response = {
      data: { a: { b: { id: null } } },
      errors: [error(["a", "b", "id"])],
    } as GraphQLResponse;
    expect((propagateIdErrors(response) as { data: unknown }).data).toEqual({ a: { b: null } });
  });

  it("does not mutate the input", () => {
    const response = {
      data: { a: { id: null } },
      errors: [error(["a", "id"], [false, true])],
    } as GraphQLResponse;
    const copy = structuredClone(response);
    propagateIdErrors(response);
    expect(response).toEqual(copy);
  });
});

const ProductQuery = graphql`
  query idErrorGuardsProductQuery($id: ID!, $idErr: Boolean!, $nameErr: Boolean!) {
    productById(id: $id) {
      id @simulateError(if: $idErr)
      name @simulateError(if: $nameErr)
      price
    }
  }
`;

const SectorsQuery = graphql`
  query idErrorGuardsSectorsQuery($errIds: [ID!]!) {
    sectors(first: 5) {
      edges {
        node {
          id @simulateError(onlyForIds: $errIds)
          name
          ...idErrorGuards_sector
        }
      }
    }
  }
`;

const SectorsWithSlugQuery = graphql`
  query idErrorGuardsSectorsWithSlugQuery($errIds: [ID!]!) {
    sectors(first: 5) {
      edges {
        node {
          id @simulateError(onlyForIds: $errIds)
          name
          slug
        }
      }
    }
  }
`;

const SectorFragment = graphql`
  fragment idErrorGuards_sector on Sector {
    name
  }
`;

const SetOrderMutation = graphql`
  mutation idErrorGuardsSetOrderMutation($order: LabListOrder!) {
    labSetSectorOrder(order: $order)
  }
`;

const RenameMutation = graphql`
  mutation idErrorGuardsRenameMutation($input: RenameProductInput!) {
    renameProduct(input: $input) {
      product {
        id @simulateError
        name
      }
    }
  }
`;

async function reorderScenario(h: Harness) {
  const first = await h.query<idErrorGuardsSectorsQuery>(SectorsQuery, {
    errIds: [SEC(2), SEC(9)],
  });
  await h.query<idErrorGuardsSectorsWithSlugQuery>(SectorsWithSlugQuery, {
    errIds: [SEC(2), SEC(9)],
  });
  const ref = first.data.sectors?.edges?.[1]?.node;
  const before = ref ? h.readFragment<idErrorGuards_sector$data>(SectorFragment, ref).data : null;
  await h.mutate<idErrorGuardsSetOrderMutation>(SetOrderMutation, {
    variables: { order: "REVERSED" },
  });
  await h.query<idErrorGuardsSectorsQuery>(SectorsQuery, { errIds: [SEC(2), SEC(9)] });
  const after = ref ? h.readFragment<idErrorGuards_sector$data>(SectorFragment, ref).data : null;
  return { ref, before, after };
}

describe("A. propagateIdErrors (integration, onError: NULL)", () => {
  const harness = () => createHarness({ onError: "NULL", guard: "propagateIdErrors" });

  it("an id error behaves like PROPAGATE: root link null + error, no client copy", async () => {
    const h = harness();
    const r = await h.query<idErrorGuardsProductQuery>(ProductQuery, {
      id: P1,
      idErr: true,
      nameErr: false,
    });
    expect(r.data.productById).toBeNull();
    expect(h.issues()).toEqual([]);
    expect(h.exchanges[0]!.response).toMatchObject({ data: { productById: { id: null } } });
    expect(h.exchanges[0]!.relayReceived).toMatchObject({ data: { productById: null } });
  });

  it("an error on any other field keeps NULL semantics: the object and its siblings survive", async () => {
    const h = harness();
    const r = await h.query<idErrorGuardsProductQuery>(ProductQuery, {
      id: P1,
      idErr: false,
      nameErr: true,
    });
    expect(r.data.productById).toMatchObject({ id: P1, name: null });
    expect(h.record(P1)?.__errors).toHaveProperty("name");
  });

  it("list reorder: the errored item is null, no record is shared or mixed", async () => {
    const h = harness();
    const { ref } = await reorderScenario(h);
    expect(ref).toBeNull();
    expect(h.issues()).toEqual([]);
  });

  it("mutation: product is null, like PROPAGATE (the rename still doesn't land, nothing can fix that)", async () => {
    const h = harness();
    const r = await h.mutate<idErrorGuardsRenameMutation>(RenameMutation, {
      variables: { input: { id: P1, name: "Renamed" } },
    });
    expect(r.data).toEqual({ renameProduct: { product: null } });
  });
});

describe("B. nullIdSafeGetDataID (integration, onError: NULL)", () => {
  const harness = () => createHarness({ onError: "NULL", guard: "nullIdSafeGetDataID" });

  it("the object keeps its data, under a unique client id", async () => {
    const h = harness();
    const r = await h.query<idErrorGuardsProductQuery>(ProductQuery, {
      id: P1,
      idErr: true,
      nameErr: false,
    });
    expect(r.data.productById).toMatchObject({ id: null, name: "Beverages item 001" });
    expect(h.issues().map((i) => [i.kind, i.dataID])).toEqual([
      ["ID_FIELD_ERROR", "client:errored-id:Product:1"],
      ["ENTITY_UNDER_CLIENT_ID", "client:errored-id:Product:1"],
    ]);
  });

  it("list reorder: a held ref keeps showing the entity it was created for, nothing mixes", async () => {
    const h = harness();
    const { before, after } = await reorderScenario(h);
    expect(before).toEqual({ name: "Technology" });
    expect(after).toEqual({ name: "Technology" });
    for (const [dataID, record] of Object.entries(h.records())) {
      if (dataID.startsWith("client:errored-id:Sector")) {
        expect([
          { name: "Technology", slug: "technology" },
          { name: "Technology", slug: undefined },
          { name: "Workspace", slug: undefined },
        ]).toContainEqual({ name: record?.name, slug: record?.slug });
      }
    }
  });
});

describe("baseline without a guard (onError: NULL), for comparison", () => {
  it("list reorder: the held ref switches entity", async () => {
    const h = createHarness({ onError: "NULL" });
    const { before, after } = await reorderScenario(h);
    expect(before).toEqual({ name: "Technology" });
    expect(after).toEqual({ name: "Workspace" });
  });
});
