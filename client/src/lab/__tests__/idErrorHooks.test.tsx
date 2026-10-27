// @vitest-environment jsdom
/**
 * React-level behavior when an entity's `id` errors: what renders, what
 * throws, and what happens to @refetchable / pagination, which need the id
 * to build their follow-up query.
 */
import { act, cleanup, render, screen } from "@testing-library/react";
import { Component, Suspense, useState, type ReactNode } from "react";
import {
  graphql,
  RelayEnvironmentProvider,
  useLazyLoadQuery,
  useMutation,
  usePaginationFragment,
  useRefetchableFragment,
} from "react-relay";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { idErrorHooksPageQuery } from "./__generated__/idErrorHooksPageQuery.graphql.js";
import type { idErrorHooks_products$key } from "./__generated__/idErrorHooks_products.graphql.js";
import type { idErrorHooks_productType$key } from "./__generated__/idErrorHooks_productType.graphql.js";
import type { idErrorHooksRenameMutation } from "./__generated__/idErrorHooksRenameMutation.graphql.js";
import type { idErrorHooksThrowingProductsPageQuery } from "./__generated__/idErrorHooksThrowingProductsPageQuery.graphql.js";
import type { idErrorHooks_throwingProducts$key } from "./__generated__/idErrorHooks_throwingProducts.graphql.js";
import type { idErrorHooksThrowingPageQuery } from "./__generated__/idErrorHooksThrowingPageQuery.graphql.js";
import { createHarness, gid, type Harness } from "./harness.js";

afterEach(cleanup);

/** Like components/ErrorBoundary, but shows the message so tests can assert on it. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    return this.state.error ? (
      <p>error boundary: {this.state.error.message}</p>
    ) : (
      this.props.children
    );
  }
}

function renderWith(h: Harness, ui: ReactNode) {
  return render(
    <RelayEnvironmentProvider environment={h.environment}>
      <ErrorBoundary>
        <Suspense fallback={<p>loading</p>}>{ui}</Suspense>
      </ErrorBoundary>
    </RelayEnvironmentProvider>,
  );
}

function ThrowingPage() {
  const data = useLazyLoadQuery<idErrorHooksThrowingPageQuery>(
    graphql`
      query idErrorHooksThrowingPageQuery @throwOnFieldError {
        productTypeBySlug(slug: "beverages") {
          id @simulateError
          name
        }
      }
    `,
    {},
  );
  return <h1>{data.productTypeBySlug?.name}</h1>;
}

describe("@throwOnFieldError page selecting the errored id", () => {
  it.each(["PROPAGATE", "NULL"] as const)("%s: the error boundary renders", async (onError) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    renderWith(createHarness({ onError }), <ThrowingPage />);
    expect(await screen.findByText(/error boundary/)).toBeTruthy();
  });

  it("HALT: the error boundary renders (network error)", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    renderWith(createHarness({ onError: "HALT" }), <ThrowingPage />);
    expect(await screen.findByText(/error boundary/)).toBeTruthy();
  });
});

/**
 * The playground's real shape (see ProductTypeProductsSection): the page
 * query doesn't read `id` itself, a @refetchable pagination fragment renders
 * the list. @refetchable makes the compiler add `id` to the fragment's
 * *reader* selection (it needs it to build the refetch query), so with
 * @throwOnFieldError that fragment throws on render.
 */
function ThrowingProductsPage() {
  const data = useLazyLoadQuery<idErrorHooksThrowingProductsPageQuery>(
    graphql`
      query idErrorHooksThrowingProductsPageQuery {
        productTypeBySlug(slug: "beverages") {
          id @simulateError
          ...idErrorHooks_throwingProducts
        }
      }
    `,
    {},
  );
  return data.productTypeBySlug && <ThrowingProducts productType={data.productTypeBySlug} />;
}

function ThrowingProducts({ productType }: { productType: idErrorHooks_throwingProducts$key }) {
  const { data } = usePaginationFragment(
    graphql`
      fragment idErrorHooks_throwingProducts on ProductType
      @throwOnFieldError
      @refetchable(queryName: "idErrorHooksThrowingProductsPaginationQuery")
      @argumentDefinitions(first: { type: "Int", defaultValue: 2 }, after: { type: "String" }) {
        products(first: $first, after: $after) @connection(key: "idErrorHooksThrowing_products") {
          edges {
            node {
              name
            }
          }
        }
      }
    `,
    productType,
  );
  return (
    <ul>
      {data.products.edges.map((e) => (
        <li key={e.node.name}>{e.node.name}</li>
      ))}
    </ul>
  );
}

describe("NULL: @throwOnFieldError + @refetchable fragment on the entity whose id errored", () => {
  it("throws on render although the component never selects id", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    renderWith(createHarness({ onError: "NULL" }), <ThrowingProductsPage />);
    expect(
      await screen.findByText(
        /error boundary: Relay: (Unexpected response payload|Received a field error)/,
      ),
    ).toBeTruthy();
  });

  it("PROPAGATE: no throw from the fragment, productTypeBySlug is just null", async () => {
    renderWith(createHarness({ onError: "PROPAGATE" }), <ThrowingProductsPage />);
    await vi.waitFor(() => expect(screen.queryByText("loading")).toBeNull());
    expect(screen.queryByText(/error boundary/)).toBeNull();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});

/** Same shape without @throwOnFieldError: renders, but the follow-up queries need the id. */
function Page({ onLoadMore }: { onLoadMore: (error: Error | null) => void }) {
  const data = useLazyLoadQuery<idErrorHooksPageQuery>(
    graphql`
      query idErrorHooksPageQuery($err: Boolean!) {
        productTypeBySlug(slug: "beverages") {
          id @simulateError(if: $err)
          ...idErrorHooks_productType
          ...idErrorHooks_products
        }
      }
    `,
    { err: true },
  );
  if (data.productTypeBySlug == null) return <p>no product type</p>;
  return (
    <>
      <Header productType={data.productTypeBySlug} />
      <Products productType={data.productTypeBySlug} onLoadMore={onLoadMore} />
    </>
  );
}

function Header({ productType }: { productType: idErrorHooks_productType$key }) {
  const [data, refetch] = useRefetchableFragment(
    graphql`
      fragment idErrorHooks_productType on ProductType
      @refetchable(queryName: "idErrorHooksProductTypeRefetchQuery") {
        name
      }
    `,
    productType,
  );
  const [refetchError, setRefetchError] = useState<string | null>(null);
  return (
    <>
      <h1>{data.name}</h1>
      <button
        onClick={() =>
          refetch(
            {},
            {
              fetchPolicy: "network-only",
              onComplete: (e) => setRefetchError(e ? e.message : "refetch ok"),
            },
          )
        }
      >
        refetch
      </button>
      {refetchError != null && <p>refetch: {refetchError}</p>}
    </>
  );
}

function Products({
  productType,
  onLoadMore,
}: {
  productType: idErrorHooks_products$key;
  onLoadMore: (error: Error | null) => void;
}) {
  const { data, loadNext } = usePaginationFragment(
    graphql`
      fragment idErrorHooks_products on ProductType
      @refetchable(queryName: "idErrorHooksProductsPaginationQuery")
      @argumentDefinitions(first: { type: "Int", defaultValue: 2 }, after: { type: "String" }) {
        products(first: $first, after: $after) @connection(key: "idErrorHooks_products") {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    productType,
  );
  return (
    <>
      <ul>
        {data.products?.edges?.map((e) => (
          <li key={e?.node?.id}>{e?.node?.name}</li>
        ))}
      </ul>
      <button onClick={() => loadNext(2, { onComplete: onLoadMore })}>more</button>
    </>
  );
}

describe("NULL: @refetchable fragments without @throwOnFieldError", () => {
  it("render, but loadNext() sends id: null and fails", async () => {
    const warn = vi.spyOn(console, "error").mockImplementation(() => {});
    const h = createHarness({ onError: "NULL" });
    const loadMore = vi.fn();
    renderWith(h, <Page onLoadMore={loadMore} />);
    expect(await screen.findByText("Beverages")).toBeTruthy();
    expect(screen.getAllByRole("listitem").map((li) => li.textContent)).toEqual([
      "Beverages item 001",
      "Beverages item 002",
    ]);

    await act(async () => screen.getByText("more").click());
    await vi.waitFor(() => expect(loadMore).toHaveBeenCalled());

    const pagination = h.exchanges.find(
      (e) => e.operationName === "idErrorHooksProductsPaginationQuery",
    );
    expect(pagination?.variables).toMatchObject({ id: null });
    expect(pagination?.response).toMatchObject({
      errors: [
        {
          message: expect.stringMatching(/Variable "\$id" of non-null type "ID!" must not be null/),
        },
      ],
    });
    expect((loadMore.mock.calls[0]![0] as Error).message).toMatch(/No data returned/);
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(warn.mock.calls.flat().join("\n")).toMatch(
      /Expected result to have a string\s+`id` in order to refetch, got `null`/,
    );
  });

  it("refetch() of a @refetchable fragment fails the same way", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const h = createHarness({ onError: "NULL" });
    renderWith(h, <Page onLoadMore={() => {}} />);
    expect(await screen.findByText("Beverages")).toBeTruthy();
    await act(async () => screen.getByText("refetch").click());
    const refetch = h.exchanges.find(
      (e) => e.operationName === "idErrorHooksProductTypeRefetchQuery",
    );
    expect(refetch?.variables).toMatchObject({ id: null });
  });
});

describe("PROPAGATE: same page", () => {
  it("productTypeBySlug is null; the page has nothing to paginate", async () => {
    renderWith(createHarness({ onError: "PROPAGATE" }), <Page onLoadMore={() => {}} />);
    expect(await screen.findByText("no product type")).toBeTruthy();
  });
});

describe("useMutation", () => {
  function Rename({ onDone }: { onDone: (r: unknown) => void }) {
    const [commit] = useMutation<idErrorHooksRenameMutation>(graphql`
      mutation idErrorHooksRenameMutation($input: RenameProductInput!) {
        renameProduct(input: $input) {
          product {
            id @simulateError
            name
          }
        }
      }
    `);
    return (
      <button
        onClick={() =>
          commit({
            variables: { input: { id: gid("Product", "p_1"), name: "Renamed" } },
            onCompleted: (data, errors) => onDone({ data, errors: errors?.length ?? 0 }),
            onError: (error) => onDone({ error: error.message }),
          })
        }
      >
        rename
      </button>
    );
  }

  it.each([
    ["PROPAGATE", { data: { renameProduct: { product: null } }, errors: 1 }],
    ["NULL", { data: { renameProduct: { product: { id: null, name: "Renamed" } } }, errors: 1 }],
    ["HALT", { error: expect.stringMatching(/No data returned/) }],
  ] as const)("%s: onCompleted / onError receives", async (onError, expected) => {
    const done = vi.fn();
    renderWith(createHarness({ onError }), <Rename onDone={done} />);
    await act(async () => screen.getByText("rename").click());
    await vi.waitFor(() => expect(done).toHaveBeenCalled());
    expect(done.mock.calls[0]![0]).toEqual(expected);
  });
});
