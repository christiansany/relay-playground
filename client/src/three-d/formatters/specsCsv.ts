/**
 * A non-React module loaded through 3D. Imagine a heavy export or
 * validation library that only some data needs. `MatchContainer` can't
 * render it. Read `__module_component` yourself instead (what Meta calls
 * `ModuleResource.read()`; OSS has no equivalent, see `readModule`).
 */
export default function specsToCsv(specs: ReadonlyArray<{ label: string; value: string }>) {
  return [
    "label,value",
    ...specs.map((s) => `${JSON.stringify(s.label)},${JSON.stringify(s.value)}`),
  ].join("\n");
}
