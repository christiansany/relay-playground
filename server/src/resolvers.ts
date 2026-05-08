import { connectionFromArray } from 'graphql-relay';
import {
  products,
  productTypes,
  type ProductRecord,
  type ProductTypeRecord,
} from './data/mockData.js';
import { fromGlobalId, nodeResolvers, resolveNode, toGlobalId } from './relay.js';

type ConnectionArgs = {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
};

export const resolvers = {
  Node: {
    __resolveType: (obj: { __typename: string }) => obj.__typename,
  },

  Query: {
    node: (_: unknown, { id }: { id: string }) => resolveNode(id),

    productTypeById: (_: unknown, { id }: { id: string }) =>
      nodeResolvers.ProductType(fromGlobalId(id).id),

    productById: (_: unknown, { id }: { id: string }) =>
      nodeResolvers.Product(fromGlobalId(id).id),

    productTypes: (_: unknown, args: ConnectionArgs) =>
      connectionFromArray(productTypes, args),
  },

  ProductType: {
    id: (pt: ProductTypeRecord) => toGlobalId('ProductType', pt.id),
    products: (pt: ProductTypeRecord, args: ConnectionArgs) =>
      connectionFromArray(
        products.filter((p) => p.productTypeId === pt.id),
        args,
      ),
  },

  Product: {
    id: (p: ProductRecord) => toGlobalId('Product', p.id),
    productType: (p: ProductRecord) =>
      productTypes.find((pt) => pt.id === p.productTypeId) ?? null,
  },
};
