// react-relay ships MatchContainer (lib/relay-hooks/MatchContainer.js) but
// does not export it from the package entry. Only its *types* are re-exported
// (MatchContainerProps, MatchPointer). This shim types the deep import.
declare module "react-relay/lib/relay-hooks/MatchContainer" {
  const MatchContainer: typeof import("react-relay/relay-hooks/MatchContainer").MatchContainer;
  export default MatchContainer;
}
