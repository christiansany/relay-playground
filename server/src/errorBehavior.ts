import { mapSchema, MapperKind } from "@graphql-tools/utils";
import {
  defaultFieldResolver,
  execute,
  GraphQLError,
  GraphQLList,
  isListType,
  isNonNullType,
  parse,
  validate,
  type DocumentNode,
  type GraphQLFieldResolver,
  type GraphQLFormattedError,
  type GraphQLOutputType,
  type GraphQLResolveInfo,
  type GraphQLSchema,
} from "graphql";

/**
 * Emulation of the GraphQL spec "error behaviors" proposal
 * (https://github.com/graphql/graphql-spec/pull/1163).
 *
 * The proposal adds an `onError` request property:
 *
 * - `PROPAGATE` (default, today's behavior): an execution error nulls the
 *   nearest *nullable* parent position. An error on `id: ID!` therefore
 *   wipes the whole object that contains it.
 * - `NULL`: the errored position is set to `null` *even if it is non-null in
 *   the schema*. Nothing propagates; the client must use `errors[].path` to
 *   tell an error-null apart from a real null. An error on `id: ID!` leaves
 *   the object in place with `"id": null`.
 * - `HALT`: the first execution error aborts the operation, the response is
 *   `{ data: null, errors: [thatError] }`.
 *
 * It also adds `pathNonNull` to every execution error: for each prefix of
 * `path`, whether that response position is non-null in the schema. That lets
 * a client request `NULL` and re-create any other behavior locally.
 *
 * graphql-js does not implement this yet (graphql/graphql-js#4364 is open
 * against 16.x, nothing in 17.0.x), so we emulate it:
 *
 * - `PROPAGATE` executes against the real schema.
 * - `NULL` executes against a copy of the schema in which every output type
 *   has its non-null wrappers removed, so graphql-js has nothing to propagate
 *   to. The resolvers in that copy re-raise "Cannot return null for
 *   non-nullable field" themselves, because the spec keeps that error in all
 *   modes, it just does not propagate under `NULL`.
 * - `HALT` executes like `NULL` and, if any error was raised, discards the
 *   data and keeps only the first error. (A real implementation would stop
 *   executing at that point; the observable response is the same.)
 * - `pathNonNull` is computed from the *original* field types, which every
 *   resolver records in the request context as it runs.
 */

export const ERROR_BEHAVIORS = ["PROPAGATE", "NULL", "HALT"] as const;
export type ErrorBehavior = (typeof ERROR_BEHAVIORS)[number];
export const DEFAULT_ERROR_BEHAVIOR: ErrorBehavior = "PROPAGATE";

export type ErrorWithPathNonNull = GraphQLFormattedError & {
  readonly pathNonNull?: readonly boolean[];
};

export type ExecutionResponse = {
  data?: Record<string, unknown> | null;
  errors?: readonly ErrorWithPathNonNull[];
};

export function parseErrorBehavior(value: unknown): ErrorBehavior | GraphQLError {
  if (value == null) return DEFAULT_ERROR_BEHAVIOR;
  if (typeof value === "string" && (ERROR_BEHAVIORS as readonly string[]).includes(value)) {
    return value as ErrorBehavior;
  }
  return new GraphQLError(
    `Invalid "onError" value ${JSON.stringify(value)}; expected one of ${ERROR_BEHAVIORS.join(", ")}.`,
  );
}

// ---------------------------------------------------------------------------
// Schema instrumentation
// ---------------------------------------------------------------------------

const FIELD_TYPES = Symbol("errorBehavior.fieldTypes");

type TrackingContext = { [FIELD_TYPES]?: Map<string, GraphQLOutputType> };

function pathKey(path: GraphQLResolveInfo["path"] | undefined): string {
  const segments: Array<string | number> = [];
  for (let p = path; p != null; p = p.prev) segments.unshift(p.key);
  return segments.join(".");
}

function recordFieldType(context: unknown, info: GraphQLResolveInfo, type: GraphQLOutputType) {
  const map = (context as TrackingContext | null)?.[FIELD_TYPES];
  map?.set(pathKey(info.path), type);
}

function stripNonNull(type: GraphQLOutputType): GraphQLOutputType {
  if (isNonNullType(type)) return stripNonNull(type.ofType);
  if (isListType(type)) return new GraphQLList(stripNonNull(type.ofType));
  return type;
}

function nonNullViolation(info: GraphQLResolveInfo): GraphQLError {
  return new GraphQLError(
    `Cannot return null for non-nullable field ${info.parentType.name}.${info.fieldName}.`,
  );
}

/**
 * Re-applies the non-null checks the nullable schema copy no longer does.
 * graphql-js treats an `Error` instance returned as a list item as an error
 * at that item's path, which is how item-level violations get the right path.
 */
function enforceNonNull(
  value: unknown,
  type: GraphQLOutputType,
  info: GraphQLResolveInfo,
): unknown {
  if (isNonNullType(type)) {
    if (value == null) return nonNullViolation(info);
    return enforceNonNull(value, type.ofType, info);
  }
  if (isListType(type) && Array.isArray(value)) {
    return value.map((item) =>
      item instanceof Error ? item : enforceNonNull(item, type.ofType, info),
    );
  }
  return value;
}

function instrument(schema: GraphQLSchema, behavior: "strict" | "nullable"): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const originalType = fieldConfig.type;
      const resolve: GraphQLFieldResolver<unknown, unknown> =
        fieldConfig.resolve ?? defaultFieldResolver;
      if (behavior === "strict") {
        return {
          ...fieldConfig,
          resolve: (source, args, context, info) => {
            recordFieldType(context, info, originalType);
            return resolve(source, args, context, info);
          },
        };
      }
      return {
        ...fieldConfig,
        type: stripNonNull(originalType),
        resolve: (source, args, context, info) => {
          recordFieldType(context, info, originalType);
          const result = resolve(source, args, context, info);
          if (result instanceof Promise) {
            return result.then((value) => {
              const checked = enforceNonNull(value, originalType, info);
              if (checked instanceof Error) throw checked;
              return checked;
            });
          }
          const checked = enforceNonNull(result, originalType, info);
          if (checked instanceof Error) throw checked;
          return checked;
        },
      };
    },
    // Object fields must stay valid implementations of their interfaces.
    [MapperKind.INTERFACE_FIELD]: (fieldConfig) =>
      behavior === "nullable"
        ? { ...fieldConfig, type: stripNonNull(fieldConfig.type) }
        : fieldConfig,
  });
}

export type ErrorBehaviorSchemas = {
  /** The real schema; used for validation, `PROPAGATE`, and introspection. */
  readonly strict: GraphQLSchema;
  /** Same schema with every non-null wrapper removed; used for `NULL` and `HALT`. */
  readonly nullable: GraphQLSchema;
};

export function createErrorBehaviorSchemas(schema: GraphQLSchema): ErrorBehaviorSchemas {
  return { strict: instrument(schema, "strict"), nullable: instrument(schema, "nullable") };
}

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------

function computePathNonNull(
  path: readonly (string | number)[],
  fieldTypes: Map<string, GraphQLOutputType>,
): boolean[] | undefined {
  const result: boolean[] = [];
  let current: GraphQLOutputType | undefined;
  for (let i = 0; i < path.length; i++) {
    const segment = path[i]!;
    if (typeof segment === "string") {
      current = fieldTypes.get(path.slice(0, i + 1).join("."));
    } else if (current != null) {
      const list = isNonNullType(current) ? current.ofType : current;
      current = isListType(list) ? list.ofType : undefined;
    }
    if (current == null) return undefined;
    result.push(isNonNullType(current));
  }
  return result;
}

function formatError(
  error: GraphQLError,
  fieldTypes: Map<string, GraphQLOutputType>,
): ErrorWithPathNonNull {
  const formatted = error.toJSON();
  if (formatted.path == null) return formatted;
  const pathNonNull = computePathNonNull(formatted.path, fieldTypes);
  return pathNonNull == null ? formatted : { ...formatted, pathNonNull };
}

export type ExecuteWithErrorBehaviorArgs = {
  readonly schemas: ErrorBehaviorSchemas;
  readonly document: DocumentNode;
  readonly variableValues?: Record<string, unknown> | null;
  readonly operationName?: string | null;
  readonly contextValue?: Record<string, unknown>;
  readonly onError: ErrorBehavior;
};

export async function executeWithErrorBehavior({
  schemas,
  document,
  variableValues,
  operationName,
  contextValue,
  onError,
}: ExecuteWithErrorBehaviorArgs): Promise<ExecutionResponse> {
  const fieldTypes = new Map<string, GraphQLOutputType>();
  const result = await execute({
    schema: onError === "PROPAGATE" ? schemas.strict : schemas.nullable,
    document,
    variableValues: variableValues ?? undefined,
    operationName: operationName ?? undefined,
    contextValue: { ...contextValue, [FIELD_TYPES]: fieldTypes },
  });
  const errors = result.errors?.map((e) => formatError(e, fieldTypes));

  if (onError === "HALT" && errors != null && errors.length > 0) {
    return { data: null, errors: [errors[0]!] };
  }
  return {
    data: result.data as Record<string, unknown> | null | undefined,
    ...(errors != null ? { errors } : {}),
  };
}

/**
 * Parse + validate + execute in one go. Used by the test suite to run the
 * real server schema in-process.
 */
export async function runRequest(
  schemas: ErrorBehaviorSchemas,
  request: {
    query: string;
    variables?: Record<string, unknown> | null;
    operationName?: string | null;
    onError?: unknown;
  },
): Promise<ExecutionResponse> {
  const onError = parseErrorBehavior(request.onError);
  if (onError instanceof GraphQLError) return { errors: [onError.toJSON()] };
  let document: DocumentNode;
  try {
    document = parse(request.query);
  } catch (e) {
    return { errors: [(e as GraphQLError).toJSON()] };
  }
  const validationErrors = validate(schemas.strict, document);
  if (validationErrors.length > 0) return { errors: validationErrors.map((e) => e.toJSON()) };
  return executeWithErrorBehavior({
    schemas,
    document,
    variableValues: request.variables,
    operationName: request.operationName,
    onError,
  });
}
