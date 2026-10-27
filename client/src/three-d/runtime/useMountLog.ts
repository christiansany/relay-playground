import { useEffect } from "react";
import { emit } from "./events.js";

/** Logs when a 3D-loaded component commits (once per mount). */
export function useMountLog(name: string) {
  useEffect(() => {
    emit("render", name);
  }, [name]);
}
