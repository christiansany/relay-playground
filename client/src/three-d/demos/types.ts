import type { ComponentType, ReactNode } from "react";
import type { PreloadedQuery } from "react-relay";
import type { ConcreteRequest, OperationType } from "relay-runtime";

export type Demo<Q extends OperationType = OperationType> = {
  id: string;
  title: string;
  /** Default `slug` variable. */
  slug: string;
  explainer: ReactNode;
  query: ConcreteRequest;
  View: ComponentType<{ queryRef: PreloadedQuery<Q> }>;
  /**
   * Client-only demos: rendered instead of `View` and no query is loaded
   * (the "run" just creates a fresh environment).
   */
  Standalone?: ComponentType;
};
