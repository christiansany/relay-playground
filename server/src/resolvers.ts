import { connectionFromArray } from "graphql-relay";
import {
  products,
  productTypes,
  sectorProductTypeLinks,
  sectors,
  type ProductRecord,
  type ProductTypeRecord,
  type SectorRecord,
} from "./data/mockData.js";
import { fromGlobalId, nodeResolvers, resolveNode, toGlobalId } from "./relay.js";

type ConnectionArgs = {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
};

function productTypesForSector(sectorId: string): ProductTypeRecord[] {
  const linked = new Set(
    sectorProductTypeLinks.filter((l) => l.sectorId === sectorId).map((l) => l.productTypeId),
  );
  return productTypes.filter((pt) => linked.has(pt.id));
}

function sectorsForProductType(productTypeId: string): SectorRecord[] {
  const linked = new Set(
    sectorProductTypeLinks.filter((l) => l.productTypeId === productTypeId).map((l) => l.sectorId),
  );
  return sectors.filter((s) => linked.has(s.id));
}

export const resolvers = {
  Node: {
    __resolveType: (obj: { __typename: string }) => obj.__typename,
  },

  Query: {
    node: (_: unknown, { id }: { id: string }) => resolveNode(id),

    productTypeById: (_: unknown, { id }: { id: string }) =>
      nodeResolvers.ProductType(fromGlobalId(id).id),

    productById: (_: unknown, { id }: { id: string }) => nodeResolvers.Product(fromGlobalId(id).id),

    sectorById: (_: unknown, { id }: { id: string }) => nodeResolvers.Sector(fromGlobalId(id).id),

    productTypeBySlug: (_: unknown, { slug }: { slug: string }) =>
      productTypes.find((pt) => pt.slug === slug) ?? null,

    sectorBySlug: (_: unknown, { slug }: { slug: string }) =>
      sectors.find((s) => s.slug === slug) ?? null,

    productTypes: (_: unknown, args: ConnectionArgs) => connectionFromArray(productTypes, args),

    sectors: (_: unknown, args: ConnectionArgs) => connectionFromArray(sectors, args),
  },

  Sector: {
    id: (s: SectorRecord) => toGlobalId("Sector", s.id),
    productTypes: (s: SectorRecord, args: ConnectionArgs) =>
      connectionFromArray(productTypesForSector(s.id), args),
  },

  ProductType: {
    id: (pt: ProductTypeRecord) => toGlobalId("ProductType", pt.id),
    products: (pt: ProductTypeRecord, args: ConnectionArgs) =>
      connectionFromArray(
        products.filter((p) => p.productTypeId === pt.id),
        args,
      ),
    sectors: (pt: ProductTypeRecord, args: ConnectionArgs) =>
      connectionFromArray(sectorsForProductType(pt.id), args),
  },

  Product: {
    id: (p: ProductRecord) => toGlobalId("Product", p.id),
    productType: (p: ProductRecord) => {
      const pt = productTypes.find((x) => x.id === p.productTypeId);
      if (!pt) {
        // Schema declares Product.productType as non-null. Fail loudly on
        // any mock-data integrity violation rather than letting GraphQL
        // turn a missing parent into a null-violation runtime error.
        throw new Error(`Product ${p.id} references unknown ProductType ${p.productTypeId}`);
      }
      return pt;
    },
  },
};
