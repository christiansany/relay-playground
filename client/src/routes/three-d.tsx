import { createFileRoute } from "@tanstack/react-router";
import { ThreeDLab } from "../three-d/lab/ThreeDLab.js";

export const Route = createFileRoute("/three-d")({
  component: ThreeDLab,
});
