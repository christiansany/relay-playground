import { fromGlobalId, toGlobalId } from 'graphql-relay';
import {
  products,
  productTypes,
  type ProductRecord,
  type ProductTypeRecord,
} from './data/mockData.js';

export { fromGlobalId, toGlobalId };

type NodeRecord = ProductTypeRecord | ProductRecord;

type NodeResolver<T extends NodeRecord> = (localId: string) => T | null;

export const nodeResolvers: {
  ProductType: NodeResolver<ProductTypeRecord>;
  Product: NodeResolver<ProductRecord>;
} = {
  ProductType: (localId) => productTypes.find((pt) => pt.id === localId) ?? null,
  Product: (localId) => products.find((p) => p.id === localId) ?? null,
};

export function resolveNode(globalId: string): NodeRecord | null {
  const { type, id } = fromGlobalId(globalId);
  if (type === 'ProductType') return nodeResolvers.ProductType(id);
  if (type === 'Product') return nodeResolvers.Product(id);
  return null;
}
