import { createFileRoute } from "@tanstack/react-router";
import { RelayEnvironmentProvider } from "react-relay";
import { Note, Row } from "../lab/components/ui.js";
import type { IdErrorGuard } from "../lab/createLabEnvironment.js";
import { ERROR_BEHAVIORS } from "../lab/errorBehavior.js";
import { Inspector } from "../lab/Inspector.js";
import { LabProvider, useLab } from "../lab/LabContext.js";
import { ListScenario } from "../lab/scenarios/ListScenario.js";
import { MutationScenario } from "../lab/scenarios/MutationScenario.js";
import { PaginationScenario } from "../lab/scenarios/PaginationScenario.js";
import { SingleEntityScenario } from "../lab/scenarios/SingleEntityScenario.js";

export const Route = createFileRoute("/lab")({
  component: LabPage,
});

const GUARDS: Array<{ value: IdErrorGuard; label: string }> = [
  { value: "none", label: "none (stock Relay)" },
  { value: "propagateIdErrors", label: "A: propagate id errors (pathNonNull)" },
  { value: "nullIdSafeGetDataID", label: "B: unique client id for null ids (getDataID)" },
];

function LabPage() {
  return (
    <LabProvider>
      <Lab />
    </LabProvider>
  );
}

function Lab() {
  const lab = useLab();
  return (
    <main>
      <h1 style={{ marginBottom: 4 }}>Error lab: errors on id</h1>
      <Note>
        Emulates the <code>onError</code> request property from{" "}
        <a href="https://github.com/graphql/graphql-spec/pull/1163">graphql-spec#1163</a> (server:{" "}
        <code>server/src/errorBehavior.ts</code>). Uses its own Relay environment; the inspector on
        the right shows that store. Findings and test suite:{" "}
        <code>docs/error-behaviors-and-relay-ids.md</code>.
      </Note>
      <Row style={{ margin: "0.5rem 0 1rem", padding: 8, background: "#f6f8fa", borderRadius: 8 }}>
        <strong>onError:</strong>
        {ERROR_BEHAVIORS.map((b) => (
          <label key={b}>
            <input
              type="radio"
              name="onError"
              checked={lab.onError === b}
              onChange={() => lab.setOnError(b)}
            />{" "}
            {b}
          </label>
        ))}
        <strong style={{ marginLeft: 16 }}>client guard:</strong>
        <select value={lab.guard} onChange={(e) => lab.setGuard(e.target.value as IdErrorGuard)}>
          {GUARDS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
        <button onClick={lab.resetStore} style={{ marginLeft: 16 }}>
          Reset store
        </button>
        <button onClick={() => void lab.resetServer()}>Reset server data + store</button>
      </Row>
      <div
        style={{ display: "grid", gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)", gap: 16 }}
      >
        <RelayEnvironmentProvider environment={lab.environment}>
          <div key={lab.generation}>
            <SingleEntityScenario />
            <ListScenario />
            <PaginationScenario />
            <MutationScenario />
          </div>
        </RelayEnvironmentProvider>
        <Inspector />
      </div>
    </main>
  );
}
