import { Suspense } from "react";
import { graphql, useClientQuery, useRelayEnvironment } from "react-relay";
import { createOperationDescriptor, type Environment } from "relay-runtime";
import { Match3D } from "../../runtime/Match3D.js";
import Client3DDemoQueryNode, {
  type Client3DDemoQuery,
} from "./__generated__/Client3DDemoQuery.graphql.js";

/**
 * Client 3D: the type of `promoSlot.badge` lives in client state
 * (written with `commitPayload`, see `writePromoSlot`), and the fields come
 * from Relay Resolvers. Because every implementation of IPromoBadge is a
 * `@relayType` model, the compiler (with `surface: "resolvers"`) puts
 * `componentModuleProvider` straight into the *reader* AST. Nothing is
 * normalized via a split operation. The reader falls back to the provider
 * when the store has no `__module_component_*`.
 */
export function Client3DDemo() {
  const data = useClientQuery<Client3DDemoQuery>(
    graphql`
      query Client3DDemoQuery {
        promoSlot {
          badge {
            __typename
            ...SaleBadgeView_badge @module(name: "./SaleBadgeView")
            ...NewBadgeView_badge @module(name: "./NewBadgeView")
          }
        }
      }
    `,
    {},
  );
  const badge = data.promoSlot?.badge;
  if (badge == null) return <p className="fallback">no badge in client state</p>;
  return (
    <Suspense fallback={<p className="fallback">loading {badge.__typename} view…</p>}>
      <Match3D match={badge} />
    </Suspense>
  );
}

/** Writes the client state that decides which badge type (and chunk) is used. */
export function writePromoSlot(environment: Environment, type: "SaleBadge" | "NewBadge" | null) {
  environment.commitPayload(createOperationDescriptor(Client3DDemoQueryNode, {}), {
    promoSlot: {
      id: "promo-slot",
      badge: type == null ? null : { __typename: type, id: `${type}-1` },
    },
  });
}

export function Client3DPanel() {
  const environment = useRelayEnvironment();
  return (
    <>
      <p>
        <button onClick={() => writePromoSlot(environment, "SaleBadge")}>
          client state: SaleBadge
        </button>{" "}
        <button onClick={() => writePromoSlot(environment, "NewBadge")}>
          client state: NewBadge
        </button>{" "}
        <button onClick={() => writePromoSlot(environment, null)}>no badge</button>
      </p>
      <Client3DDemo />
    </>
  );
}
