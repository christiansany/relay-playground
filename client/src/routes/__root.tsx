import { Suspense } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ErrorBoundary } from "../components/ErrorBoundary.js";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <Link to="/" style={{ fontWeight: 600, fontSize: "1.1rem", textDecoration: "none" }}>
          Relay Playground
        </Link>
      </header>
      <ErrorBoundary fallback={<p>Something went wrong.</p>}>
        <Suspense fallback={<p>Loading…</p>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
