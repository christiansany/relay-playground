/**
 * Errors on the `id` of list items.
 *
 * `edges: [SectorEdge] @semanticNonNull(levels: [0, 1])` and
 * `SectorEdge.node: Sector @semanticNonNull` are nullable in the schema,
 * so under PROPAGATE an error on `node.id` nulls `edges[i].node`. Under NULL
 * the node stays, with `"id": null`.
 *
 * When `id` is null, Relay derives the record id from the *path*:
 * `client:root:sectors(first:5):edges:1:node`. That id says "whatever is at
 * index 1", not "Technology".
 */
import { graphql } from "relay-runtime";
import { describe, expect, it } from "vitest";
import type { idErrorListsConnectionQuery } from "./__generated__/idErrorListsConnectionQuery.graphql.js";
import PaginationQuery, {
  type idErrorListsProductsPaginationQuery,
} from "./__generated__/idErrorListsProductsPaginationQuery.graphql.js";
import type { idErrorLists_products$data } from "./__generated__/idErrorLists_products.graphql.js";
import type { idErrorLists_sector$data } from "./__generated__/idErrorLists_sector.graphql.js";
import type { idErrorListsSectorsQuery } from "./__generated__/idErrorListsSectorsQuery.graphql.js";
import type { idErrorListsSectorsWithSlugQuery } from "./__generated__/idErrorListsSectorsWithSlugQuery.graphql.js";
import type { idErrorListsSetOrderMutation } from "./__generated__/idErrorListsSetOrderMutation.graphql.js";
import { createHarness, gid, type Harness } from "./harness.js";

const SEC = (n: number) => gid("Sector", `sec_${n}`);
const NODE_AT = (i: number) => `client:root:sectors(first:5):edges:${i}:node`;

const SectorsQuery = graphql`
  query idErrorListsSectorsQuery($errIds: [ID!]!) {
    sectors(first: 5) {
      edges {
        node {
          id @simulateError(onlyForIds: $errIds)
          name
          ...idErrorLists_sector
        }
      }
    }
  }
`;

/** A "detail panel" fragment, rendered from a list item's fragment ref. */
const SectorFragment = graphql`
  fragment idErrorLists_sector on Sector {
    name
  }
`;

const SectorsWithSlugQuery = graphql`
  query idErrorListsSectorsWithSlugQuery($errIds: [ID!]!) {
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

const SetOrderMutation = graphql`
  mutation idErrorListsSetOrderMutation($order: LabListOrder!) {
    labSetSectorOrder(order: $order)
  }
`;

const ConnectionQuery = graphql`
  query idErrorListsConnectionQuery($id: ID!, $errIds: [ID!]!) {
    productTypeById(id: $id) {
      ...idErrorLists_products @arguments(errIds: $errIds)
    }
  }
`;

const ProductsFragment = graphql`
  fragment idErrorLists_products on ProductType
  @refetchable(queryName: "idErrorListsProductsPaginationQuery")
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 3 }
    after: { type: "String" }
    errIds: { type: "[ID!]!" }
  ) {
    products(first: $first, after: $after) @connection(key: "idErrorLists_products") {
      edges {
        node {
          id @simulateError(onlyForIds: $errIds)
          name
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;

async function reverseSectors(h: Harness) {
  const r = await h.mutate<idErrorListsSetOrderMutation>(SetOrderMutation, {
    variables: { order: "REVERSED" },
    onError: "PROPAGATE",
  });
  expect(r.errors).toBeNull();
}

describe("one list item's id errors", () => {
  it("PROPAGATE: that edge's node is null (+ error), the other items are normalized", async () => {
    const h = createHarness({ onError: "PROPAGATE" });
    const r = await h.query<idErrorListsSectorsQuery>(SectorsQuery, { errIds: [SEC(2)] });
    expect(r.data.sectors?.edges?.map((e) => e?.node?.name ?? null)).toEqual([
      "Food & Drink",
      null,
      "Lifestyle",
      "Home",
      "Outdoor",
    ]);
    expect(h.record("client:root:sectors(first:5):edges:1")).toMatchInlineSnapshot(`
      {
        "__errors": {
          "node": [
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
                false,
                false,
                false,
                true,
              ],
            },
          ],
        },
        "__id": "client:root:sectors(first:5):edges:1",
        "__typename": "SectorEdge",
        "node": null,
      }
    `);
    expect(h.issues()).toEqual([]);
  });

  it("NULL: the node is stored under a positional client id", async () => {
    const h = createHarness({ onError: "NULL" });
    const r = await h.query<idErrorListsSectorsQuery>(SectorsQuery, { errIds: [SEC(2)] });
    expect(r.data.sectors?.edges?.map((e) => e?.node?.name)).toEqual([
      "Food & Drink",
      "Technology",
      "Lifestyle",
      "Home",
      "Outdoor",
    ]);
    expect(h.record("client:root:sectors(first:5):edges:1")?.node).toEqual({ __ref: NODE_AT(1) });
    expect(h.record(NODE_AT(1))).toMatchObject({
      __typename: "Sector",
      id: null,
      name: "Technology",
    });
    expect(h.record(SEC(2))).toBeUndefined();
  });

  it("HALT: the whole list request fails", async () => {
    const h = createHarness({ onError: "HALT" });
    const r = await h.query<idErrorListsSectorsQuery>(SectorsQuery, { errIds: [SEC(2)] });
    expect(r.networkError).not.toBeNull();
    expect(h.record("client:root")).toMatchObject({ __id: "client:root" });
    expect(h.record("client:root")).not.toHaveProperty(["sectors(first:5)"]);
  });
});

describe("positional client ids: a different entity lands in the same record", () => {
  it("NULL: a view holding a ref to the errored item switches to another entity after the list reorders", async () => {
    const h = createHarness({ onError: "NULL" });
    const first = await h.query<idErrorListsSectorsQuery>(SectorsQuery, {
      errIds: [SEC(2), SEC(9)],
    });
    // The user opens "Technology" (index 1); a detail panel renders it from the list item's ref.
    const technologyRef = first.data.sectors!.edges![1]!.node!;
    expect(h.readFragment<idErrorLists_sector$data>(SectorFragment, technologyRef).data.name).toBe(
      "Technology",
    );

    // The list order changes on the server; the list refetches. Index 1 is
    // now "Workspace", whose id also errors.
    await reverseSectors(h);
    const second = await h.query<idErrorListsSectorsQuery>(SectorsQuery, {
      errIds: [SEC(2), SEC(9)],
    });
    expect(second.data.sectors!.edges!.map((e) => e!.node!.name)).toEqual([
      "Mobility & Tools",
      "Workspace",
      "Pets & Animals",
      "Knowledge & Hobby",
      "Wellness",
    ]);

    // The detail panel still holds { __id: NODE_AT(1) } and now shows Workspace.
    expect(h.readFragment<idErrorLists_sector$data>(SectorFragment, technologyRef).data.name).toBe(
      "Workspace",
    );
  });

  it("NULL: two queries with different selections over the same list produce a mixed record", async () => {
    const h = createHarness({ onError: "NULL" });
    await h.query<idErrorListsSectorsWithSlugQuery>(SectorsWithSlugQuery, {
      errIds: [SEC(2), SEC(9)],
    });
    expect(h.record(NODE_AT(1))).toMatchObject({ name: "Technology", slug: "technology" });

    await reverseSectors(h);
    await h.query<idErrorListsSectorsQuery>(SectorsQuery, { errIds: [SEC(2), SEC(9)] });

    // name from Workspace, slug from Technology: a record no server ever sent.
    expect(h.record(NODE_AT(1))).toMatchObject({ id: null, name: "Workspace", slug: "technology" });
  });

  it("PROPAGATE: same flow, the errored positions are null, nothing mixes", async () => {
    const h = createHarness({ onError: "PROPAGATE" });
    const first = await h.query<idErrorListsSectorsQuery>(SectorsQuery, {
      errIds: [SEC(2), SEC(9)],
    });
    expect(first.data.sectors!.edges![1]!.node).toBeNull();
    await reverseSectors(h);
    const second = await h.query<idErrorListsSectorsQuery>(SectorsQuery, {
      errIds: [SEC(2), SEC(9)],
    });
    expect(second.data.sectors!.edges![1]!.node).toBeNull();
    expect(h.issues()).toEqual([]);
  });
});

describe("@connection + pagination", () => {
  const PT1 = gid("ProductType", "pt_1");
  const P = (n: number) => gid("Product", `p_${n}`);

  async function loadTwoPages(h: Harness, errIds: string[]) {
    const first = await h.query<idErrorListsConnectionQuery>(ConnectionQuery, { id: PT1, errIds });
    const page1 = h.readFragment<idErrorLists_products$data>(
      ProductsFragment,
      first.data.productTypeById,
    );
    // What usePaginationFragment's loadNext() sends: the generated @refetchable query.
    await h.query<idErrorListsProductsPaginationQuery>(PaginationQuery, {
      id: PT1,
      first: 3,
      after: page1.data.products!.pageInfo!.endCursor,
      errIds,
    });
    return h.readFragment<idErrorLists_products$data>(ProductsFragment, first.data.productTypeById)
      .data;
  }

  it("PROPAGATE: the merged connection keeps an edge whose node is null", async () => {
    const h = createHarness({ onError: "PROPAGATE" });
    const data = await loadTwoPages(h, [P(5)]);
    expect(data.products!.edges!.map((e) => e?.node?.name ?? null)).toEqual([
      "Beverages item 001",
      "Beverages item 002",
      "Beverages item 003",
      "Beverages item 004",
      null,
      "Beverages item 006",
    ]);
  });

  it("NULL: the merged connection keeps the item, pointing at a page-path client record", async () => {
    const h = createHarness({ onError: "NULL" });
    const data = await loadTwoPages(h, [P(5)]);
    expect(data.products!.edges!.map((e) => e?.node?.name ?? null)).toEqual([
      "Beverages item 001",
      "Beverages item 002",
      "Beverages item 003",
      "Beverages item 004",
      "Beverages item 005",
      "Beverages item 006",
    ]);
    const connection = Object.keys(h.records()).find((k) =>
      k.endsWith("__idErrorLists_products_connection"),
    )!;
    const edgeRefs = h.record(connection)!.edges as { __refs: string[] };
    const nodeOf = (edgeID: string) => (h.record(edgeID)!.node as { __ref: string }).__ref;
    expect(edgeRefs.__refs.map(nodeOf)).toMatchInlineSnapshot(`
      [
        "UHJvZHVjdDpwXzE=",
        "UHJvZHVjdDpwXzI=",
        "UHJvZHVjdDpwXzM=",
        "UHJvZHVjdDpwXzQ=",
        "client:UHJvZHVjdFR5cGU6cHRfMQ==:products(after:"YXJyYXljb25uZWN0aW9uOjI=",first:3):edges:1:node",
        "UHJvZHVjdDpwXzY=",
      ]
    `);
  });
});
