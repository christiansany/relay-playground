import {
  type FieldNode,
  type FragmentDefinitionNode,
  Kind,
  parse,
  type SelectionNode,
} from 'graphql';
import type { GraphQLSingularResponse } from 'relay-runtime';

const DIRECTIVE_NAME = 'simulateError';
const SIMULATED_ERROR_MESSAGE = 'Simulated error via @simulateError directive';

export type SimulateErrorField = {
  /** Path from the operation root to the field that should be nulled. */
  path: string[];
};

/**
 * Walks the GraphQL AST of `query` and collects the path of every field
 * tagged with `@simulateError`. Fragment spreads are inlined.
 */
export function parseSimulateErrorDirectives(
  query: string,
): SimulateErrorField[] {
  const fields: SimulateErrorField[] = [];

  try {
    const document = parse(query);

    const fragments = new Map<string, FragmentDefinitionNode>();
    for (const definition of document.definitions) {
      if (definition.kind === Kind.FRAGMENT_DEFINITION) {
        fragments.set(definition.name.value, definition);
      }
    }

    for (const definition of document.definitions) {
      if (definition.kind === Kind.OPERATION_DEFINITION) {
        processSelections(
          definition.selectionSet.selections,
          [],
          fragments,
          fields,
        );
      }
    }
  } catch (error) {
    console.error('[Relay] Failed to parse query for @simulateError:', error);
  }

  // Deduplicate by path (a field reached via two fragments shouldn't error twice).
  const seen = new Map<string, SimulateErrorField>();
  for (const field of fields) {
    const key = JSON.stringify(field.path);
    if (!seen.has(key)) seen.set(key, field);
  }
  return Array.from(seen.values());
}

function processSelections(
  selections: readonly SelectionNode[],
  currentPath: string[],
  fragments: Map<string, FragmentDefinitionNode>,
  results: SimulateErrorField[],
): void {
  for (const selection of selections) {
    if (selection.kind === Kind.FIELD) {
      processField(selection, currentPath, fragments, results);
    } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
      const fragmentDef = fragments.get(selection.name.value);
      if (fragmentDef?.selectionSet) {
        processSelections(
          fragmentDef.selectionSet.selections,
          currentPath,
          fragments,
          results,
        );
      }
    } else if (selection.kind === Kind.INLINE_FRAGMENT) {
      processSelections(
        selection.selectionSet.selections,
        currentPath,
        fragments,
        results,
      );
    }
  }
}

function processField(
  field: FieldNode,
  currentPath: string[],
  fragments: Map<string, FragmentDefinitionNode>,
  results: SimulateErrorField[],
): void {
  // Use alias if present so the path matches what the server returns.
  const fieldName = field.alias ? field.alias.value : field.name.value;
  const fieldPath = [...currentPath, fieldName];

  const tagged = field.directives?.some(
    (directive) => directive.name.value === DIRECTIVE_NAME,
  );
  if (tagged) {
    results.push({ path: fieldPath });
  }

  if (field.selectionSet) {
    processSelections(
      field.selectionSet.selections,
      fieldPath,
      fragments,
      results,
    );
  }
}

/**
 * Removes every `@simulateError` directive token from `query` so the server
 * never sees a directive it doesn't know about.
 */
export function stripSimulateErrorDirectives(query: string): string {
  const directiveRegex = new RegExp(`\\s*@${DIRECTIVE_NAME}\\b`, 'g');
  return query.replace(directiveRegex, '');
}

/**
 * Mutates a clone of `response` so each field at `fields[i].path` is null and
 * a corresponding entry is appended to `errors`. Array fields generate one
 * error per element with the index in the path.
 */
export function simulateFieldErrors(
  response: GraphQLSingularResponse,
  fields: SimulateErrorField[],
): GraphQLSingularResponse {
  if (fields.length === 0 || !('data' in response) || response.data == null) {
    return response;
  }

  const modified = {
    ...response,
    data: { ...response.data },
    errors:
      'errors' in response && response.errors ? [...response.errors] : [],
  };

  for (const field of fields) {
    const nulledPaths = nullFieldAtPath(
      modified.data as Record<string, unknown>,
      field.path,
    );
    for (const path of nulledPaths) {
      modified.errors.push({ message: SIMULATED_ERROR_MESSAGE, path });
    }
  }

  return modified as GraphQLSingularResponse;
}

function nullFieldAtPath(
  data: Record<string, unknown>,
  path: string[],
): Array<Array<string | number>> {
  if (path.length === 0) return [];
  const nulledPaths: Array<Array<string | number>> = [];

  function navigate(
    current: unknown,
    pathIndex: number,
    currentPath: Array<string | number>,
  ): void {
    if (pathIndex >= path.length) return;
    if (current == null || typeof current !== 'object') return;

    if (Array.isArray(current)) {
      for (let i = 0; i < current.length; i++) {
        navigate(current[i], pathIndex, [...currentPath, i]);
      }
      return;
    }

    const obj = current as Record<string, unknown>;
    const segment = path[pathIndex];
    const isLast = pathIndex === path.length - 1;

    if (isLast) {
      if (segment in obj) {
        obj[segment] = null;
        nulledPaths.push([...currentPath, segment]);
      }
    } else {
      const value = obj[segment];
      if (value != null) {
        navigate(value, pathIndex + 1, [...currentPath, segment]);
      }
    }
  }

  navigate(data, 0, []);
  return nulledPaths;
}
