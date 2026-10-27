import type { Demo } from "../../demos/types.js";
import Client3DDemoQueryNode from "./__generated__/Client3DDemoQuery.graphql.js";
import { Client3DPanel } from "./Client3DDemo.js";

export const client3dDemo: Demo = {
  id: "client-3d",
  title: "Client 3D (Relay Resolvers)",
  slug: "espresso-machine",
  query: Client3DDemoQueryNode,
  View: () => null,
  Standalone: Client3DPanel,
  explainer: (
    <p>
      Here the concrete type comes from <b>client state</b> and the fields from Relay Resolvers.
      There's no server and no split-operation normalization: the reader AST carries{" "}
      <code>componentModuleProvider</code> itself. Press "cold run", then switch the client state.
      Each badge view chunk is downloaded the first time its type shows up.
    </p>
  ),
};
