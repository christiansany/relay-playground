// @vitest-environment jsdom
/**
 * Regression test for the /lab page freezing.
 *
 * react-relay reports field errors to `relayFieldLogger` from the *render* of
 * every component that reads an errored field, on every render
 * (`handlePotentialSnapshotErrorsForState` in useFragmentInternal). The lab
 * turns those events into React state for the inspector. Two loops came out
 * of that:
 *
 * - the state sat in the context the page consumed, so logging re-rendered
 *   the scenarios, which logged again (fixed: separate activity context);
 * - even with nothing re-rendering the component, the state update lands
 *   while React is rendering it (a Suspense retry), React discards and
 *   restarts that render, which logs again (fixed: only distinct events
 *   become state). This test fails with thousands of renders without it.
 */
import { act, cleanup, render, screen } from "@testing-library/react";
import { Suspense } from "react";
import { graphql, RelayEnvironmentProvider, useLazyLoadQuery } from "react-relay";
import { afterEach, expect, it } from "vitest";
import { resetMockData } from "../../../../server/src/data/mockData.js";
import { runRequest } from "../../../../server/src/errorBehavior.js";
import { schemas } from "../../../../server/src/schema.js";
import type { GraphQLTransport } from "../errorBehavior.js";
import { LabProvider, useLab, useLabActivity } from "../LabContext.js";
import type { labProviderProductQuery } from "./__generated__/labProviderProductQuery.graphql.js";

afterEach(cleanup);

const transport: GraphQLTransport = (body) => runRequest(schemas, body);

let productRenders = 0;

function Product() {
  productRenders++;
  const data = useLazyLoadQuery<labProviderProductQuery>(
    graphql`
      query labProviderProductQuery($id: ID!) {
        productById(id: $id) {
          id @simulateError
          name
        }
      }
    `,
    { id: btoa("Product:p_1") },
  );
  return <p>product: {data.productById?.name}</p>;
}

/** Shaped like routes/lab.tsx: consumes the lab and renders the scenarios. */
function Page() {
  const lab = useLab();
  return (
    <RelayEnvironmentProvider environment={lab.environment}>
      <Suspense fallback={<p>loading</p>}>
        <Product />
      </Suspense>
      <FieldLogCount />
    </RelayEnvironmentProvider>
  );
}

/** Shaped like the inspector. */
function FieldLogCount() {
  return <p>field logs: {useLabActivity().fieldLogs.length}</p>;
}

it("field errors logged during render don't re-render the scenarios in a loop", async () => {
  resetMockData();
  productRenders = 0;
  render(
    <LabProvider transport={transport}>
      <Page />
    </LabProvider>,
  );
  expect(await screen.findByText(/product: /)).toBeTruthy();
  // Give a feedback loop time to show itself; each turn is a microtask + render.
  await act(() => new Promise((resolve) => setTimeout(resolve, 100)));

  // The logger still reaches the inspector...
  expect(screen.getByText(/field logs: [1-9]/)).toBeTruthy();
  // ...without re-rendering the component that triggered it. (Suspend and
  // resolve is a handful of renders; the loop was unbounded.)
  expect(productRenders).toBeLessThan(10);
});
