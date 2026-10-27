import {
  createOperationDescriptor,
  Environment,
  fetchQuery,
  Network,
  Observable,
  RecordSource,
  Store,
  type ConcreteRequest,
  type GraphQLResponse,
  type OperationLoader,
} from "relay-runtime";
import { describe, expect, it } from "vitest";
import UnionBlocksDemoQuery from "../demos/__generated__/UnionBlocksDemoQuery.graphql.js";
import "../server3d/registry.js";
import Server3DDemoQuery from "../server3d/__generated__/Server3DDemoQuery.graphql.js";
import { operationLoader } from "../runtime/operationLoader.js";
import { parseRecordsWithRefs, stringifyRecordsWithRefs } from "../ssr/protocol.js";
import unionPayload from "./fixtures/UnionBlocksDemoQuery.headphones.json";
import server3dPayload from "./fixtures/Server3DDemoQuery.headphones.json";

// These tests pin down the runtime behaviours the docs rely on, using the
// real compiled artifacts and real responses captured from the dev server.

const vars = { slug: "noise-cancelling-headphones" };
const componentKey = "__module_component_UnionBlocksDemoQuery";
const operationKey = "__module_operation_UnionBlocksDemoQuery";

/** Never answers synchronously: models "chunk not downloaded yet". */
const asyncOnlyLoader: OperationLoader = { get: () => null, load: operationLoader.load };

function createEnv(
  payload: unknown,
  opts: {
    executorLoader?: OperationLoader;
    storeLoader?: OperationLoader;
    source?: RecordSource;
  } = {},
) {
  return new Environment({
    network: Network.create(() => Observable.from(payload as GraphQLResponse)),
    store: new Store(opts.source ?? new RecordSource(), {
      operationLoader: opts.storeLoader ?? operationLoader,
      gcReleaseBufferSize: 0,
    }),
    operationLoader: opts.executorLoader ?? operationLoader,
  });
}

function execute(env: Environment, query: ConcreteRequest) {
  return new Promise<void>((resolve, reject) =>
    fetchQuery(env, query, vars, { fetchPolicy: "network-only" }).subscribe({
      complete: resolve,
      error: reject,
    }),
  );
}

const check = (env: Environment, query: ConcreteRequest) =>
  env.check(createOperationDescriptor(query, vars)).status;

const record = (env: Environment, id: string) =>
  env.getStore().getSource().get(id) as Record<string, unknown> | null | undefined;

describe("compiler 3D: what lands in the store", () => {
  it("stores the module thunks on the record, normalizes the subtree only after the split operation loaded", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const gatedLoader: OperationLoader = {
      get: () => null,
      load: (ref) => gate.then(() => operationLoader.load(ref)),
    };
    const env = createEnv(unionPayload, { executorLoader: gatedLoader });
    let completed = false;
    const done = execute(env, UnionBlocksDemoQuery).then(() => (completed = true));
    await Promise.resolve();

    // The network payload is fully in, but only the "envelope" of each 3D
    // record is written: __typename, id and the two module references.
    const textBlock = record(env, "blk_10")!;
    expect(typeof textBlock[componentKey]).toBe("function");
    expect(typeof textBlock[operationKey]).toBe("function");
    expect(textBlock.heading).toBeUndefined();
    expect(completed).toBe(false); // the request stays in flight

    release();
    await done;
    expect(record(env, "blk_10")!.heading).toBe("Hear nothing but your music");
    // Nested 3D (carousel items) was normalized in a second round.
    expect(record(env, "blk_14")).toBeTruthy();
  });

  it("environment.check() is only 'available' if operationLoader.get() answers synchronously", async () => {
    const env = createEnv(unionPayload);
    await execute(env, UnionBlocksDemoQuery);
    expect(check(env, UnionBlocksDemoQuery)).toBe("available");

    // Same records, a store whose loader can't answer synchronously (e.g.
    // right after hydration, before the chunks are downloaded).
    const cold = createEnv(unionPayload, {
      storeLoader: asyncOnlyLoader,
      source: env.getStore().getSource() as RecordSource,
    });
    expect(check(cold, UnionBlocksDemoQuery)).toBe("missing");
  });
});

describe("SSR: serializing the store", () => {
  it("JSON.stringify drops compiler-3D refs, so a hydrated store reports 'missing' (and refetches)", async () => {
    const env = createEnv(unionPayload);
    await execute(env, UnionBlocksDemoQuery);
    const records = env.getStore().getSource().toJSON();

    const naive = JSON.parse(JSON.stringify(records));
    expect(naive.blk_10[componentKey]).toBeUndefined();
    expect(
      check(createEnv(unionPayload, { source: new RecordSource(naive) }), UnionBlocksDemoQuery),
    ).toBe("missing");

    const revived = parseRecordsWithRefs(stringifyRecordsWithRefs(records));
    expect(typeof revived.blk_10[componentKey]).toBe("function");
    expect(
      check(createEnv(unionPayload, { source: new RecordSource(revived) }), UnionBlocksDemoQuery),
    ).toBe("available");
  });

  it("Server 3D refs are strings and survive JSON, but still need the split operations preloaded", async () => {
    const env = createEnv(server3dPayload);
    await execute(env, Server3DDemoQuery);
    const json = JSON.parse(JSON.stringify(env.getStore().getSource().toJSON()));
    expect(json.blk_10.__module_component_Server3DDemoQuery).toBe("Server3DTextBlock");

    const warm = createEnv(server3dPayload, { source: new RecordSource(json) });
    expect(check(warm, Server3DDemoQuery)).toBe("available");
    const cold = createEnv(server3dPayload, {
      source: new RecordSource(json),
      storeLoader: asyncOnlyLoader,
    });
    expect(check(cold, Server3DDemoQuery)).toBe("missing");
  });
});

describe("garbage collection", () => {
  it("can't see into a 3D subtree whose split operation isn't synchronously available", async () => {
    for (const [storeLoader, expected] of [
      [operationLoader, true],
      [asyncOnlyLoader, false],
    ] as const) {
      const env = createEnv(unionPayload, { storeLoader });
      await execute(env, UnionBlocksDemoQuery);
      const retain = env.retain(createOperationDescriptor(UnionBlocksDemoQuery, vars));
      (env.getStore() as unknown as { __gc(): void }).__gc();
      // blk_14 (ImageGalleryBlock inside the carousel) is only reachable
      // through CarouselBlock_block$normalization.
      expect(record(env, "blk_14") != null).toBe(expected);
      retain.dispose();
    }
  });
});
