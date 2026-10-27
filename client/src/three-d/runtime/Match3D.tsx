import type { ComponentType, ReactNode } from "react";
// Not `import { MatchContainer } from "react-relay"`: the OSS package does
// not export it (despite the docs). See react-relay-match-container.d.ts.
import MatchContainer from "react-relay/lib/relay-hooks/MatchContainer";
import type { MatchContainerProps } from "react-relay/relay-hooks/MatchContainer";
import { readModule } from "./moduleRef.js";

type MatchProp = MatchContainerProps["match"];

/**
 * `MatchContainer` with the `loader` filled in. In OSS, `loader` is
 * **required**, even though the docs' examples leave it out (Meta's internal
 * wrappers inject it).
 *
 * What MatchContainer does, in full (react-relay/relay-hooks/MatchContainer.js):
 *
 * 1. Reads `__module_component`, `__fragmentPropName`, `__id`, `__fragments`
 *    and `__fragmentOwner` from `match`. The reader puts these there only if
 *    the concrete type matched a `@module` spread.
 * 2. Calls `loader(__module_component)` **during render**. Throwing a promise
 *    suspends to the nearest `<Suspense>`.
 * 3. Renders `<Component {...props} {[__fragmentPropName]: fragmentRef} />`.
 *    The prop name is the fragment name's suffix after the first `_`, so
 *    `TextBlock_block` arrives as `block`.
 * 4. Renders `fallback` (or null) if no `@module` spread matched, e.g. for
 *    an unknown union member.
 */
export function Match3D<TProps extends object = object>({
  match,
  props,
  fallback,
}: {
  match: MatchProp;
  props?: TProps;
  fallback?: ReactNode;
}) {
  // @types/react-relay types MatchContainer's return value as
  // `ElementType | ...`, which isn't a valid JSX return type. Call it through
  // a cast.
  const Container = MatchContainer as unknown as ComponentType<MatchContainerProps<TProps>>;
  return (
    <Container
      match={match}
      props={props}
      fallback={fallback}
      loader={(ref: unknown) => readModule(ref) as ComponentType<TProps>}
    />
  );
}
