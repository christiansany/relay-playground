import { fromGlobalId, toGlobalId } from 'graphql-relay';
import {
  products,
  productTypes,
  sectors,
  type ProductRecord,
  type ProductTypeRecord,
  type SectorRecord,
} from './data/mockData.js';

export { fromGlobalId, toGlobalId };

type NodeRecord = SectorRecord | ProductTypeRecord | ProductRecord;

type NodeResolver<T extends NodeRecord> = (localId: string) => T | null;

export const nodeResolvers: {
  Sector: NodeResolver<SectorRecord>;
  ProductType: NodeResolver<ProductTypeRecord>;
  Product: NodeResolver<ProductRecord>;
} = {
  Sector: (localId) => sectors.find((s) => s.id === localId) ?? null,
  ProductType: (localId) => productTypes.find((pt) => pt.id === localId) ?? null,
  Product: (localId) => products.find((p) => p.id === localId) ?? null,
};

export function resolveNode(globalId: string): NodeRecord | null {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'Sector') return nodeResolvers.Sector(id);
  if (type === 'ProductType') return nodeResolvers.ProductType(id);
  if (type === 'Product') return nodeResolvers.Product(id);
  return null;
}
