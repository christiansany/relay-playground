import { Suspense } from "react";
import { RelayEnvironmentProvider, type PreloadedQuery } from "react-relay";
import type { Environment, OperationType } from "relay-runtime";
import { Server3DSsrPage } from "../server3d/Server3DSsrPage.js";
import { isServer3DMode, type Mode } from "./protocol.js";
import { SsrPage } from "./SsrPage.js";

/** Root rendered identically on the server and in the browser. */
export function SsrApp({
  environment,
  queryRef,
  mode,
}: {
  environment: Environment;
  queryRef: PreloadedQuery<OperationType>;
  mode: Mode;
}) {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback={<p className="fallback">page loading…</p>}>
        {isServer3DMode(mode) ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <Server3DSsrPage queryRef={queryRef as any} />
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SsrPage queryRef={queryRef as any} />
        )}
      </Suspense>
    </RelayEnvironmentProvider>
  );
}
