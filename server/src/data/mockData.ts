export type SectorRecord = {
  __typename: "Sector";
  id: string;
  slug: string;
  name: string;
};

export type ProductTypeRecord = {
  __typename: "ProductType";
  id: string;
  slug: string;
  name: string;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function withSlug<T extends { name: string }>(record: T): T & { slug: string } {
  return { ...record, slug: slugify(record.name) };
}

export type ProductRecord = {
  __typename: "Product";
  id: string;
  name: string;
  description: string;
  price: number;
  productTypeId: string;
};

export const sectors: SectorRecord[] = (
  [
    { __typename: "Sector", id: "sec_1", name: "Food & Drink" },
    { __typename: "Sector", id: "sec_2", name: "Technology" },
    { __typename: "Sector", id: "sec_3", name: "Lifestyle" },
    { __typename: "Sector", id: "sec_4", name: "Home" },
    { __typename: "Sector", id: "sec_5", name: "Outdoor" },
    { __typename: "Sector", id: "sec_6", name: "Wellness" },
    { __typename: "Sector", id: "sec_7", name: "Knowledge & Hobby" },
    { __typename: "Sector", id: "sec_8", name: "Pets & Animals" },
    { __typename: "Sector", id: "sec_9", name: "Workspace" },
    { __typename: "Sector", id: "sec_10", name: "Mobility & Tools" },
  ] as const
).map(withSlug);

export const productTypes: ProductTypeRecord[] = (
  [
    { __typename: "ProductType", id: "pt_1", name: "Beverages" },
    { __typename: "ProductType", id: "pt_2", name: "Snacks" },
    { __typename: "ProductType", id: "pt_3", name: "Electronics" },
    { __typename: "ProductType", id: "pt_4", name: "Clothing" },
    { __typename: "ProductType", id: "pt_5", name: "Books" },
    { __typename: "ProductType", id: "pt_6", name: "Home Goods" },
    { __typename: "ProductType", id: "pt_7", name: "Office Supplies" },
    { __typename: "ProductType", id: "pt_8", name: "Sports Gear" },
    { __typename: "ProductType", id: "pt_9", name: "Outdoor & Camping" },
    { __typename: "ProductType", id: "pt_10", name: "Beauty & Personal Care" },
    { __typename: "ProductType", id: "pt_11", name: "Health & Wellness" },
    { __typename: "ProductType", id: "pt_12", name: "Toys & Games" },
    { __typename: "ProductType", id: "pt_13", name: "Pet Supplies" },
    { __typename: "ProductType", id: "pt_14", name: "Automotive" },
    { __typename: "ProductType", id: "pt_15", name: "Garden & Outdoor" },
    { __typename: "ProductType", id: "pt_16", name: "Tools & Hardware" },
    { __typename: "ProductType", id: "pt_17", name: "Kitchen & Dining" },
    { __typename: "ProductType", id: "pt_18", name: "Bedding & Bath" },
    { __typename: "ProductType", id: "pt_19", name: "Musical Instruments" },
    { __typename: "ProductType", id: "pt_20", name: "Art & Craft Supplies" },
  ] as const
).map(withSlug);

// Many-to-many: a ProductType can belong to multiple Sectors and vice versa.
type Link = { sectorId: string; productTypeId: string };

export const sectorProductTypeLinks: Link[] = [
  // Food & Drink
  { sectorId: "sec_1", productTypeId: "pt_1" }, // Beverages
  { sectorId: "sec_1", productTypeId: "pt_2" }, // Snacks
  { sectorId: "sec_1", productTypeId: "pt_17" }, // Kitchen & Dining
  // Technology
  { sectorId: "sec_2", productTypeId: "pt_3" }, // Electronics
  { sectorId: "sec_2", productTypeId: "pt_19" }, // Musical Instruments
  // Lifestyle
  { sectorId: "sec_3", productTypeId: "pt_4" }, // Clothing
  { sectorId: "sec_3", productTypeId: "pt_10" }, // Beauty & Personal Care
  { sectorId: "sec_3", productTypeId: "pt_18" }, // Bedding & Bath
  // Home
  { sectorId: "sec_4", productTypeId: "pt_6" }, // Home Goods
  { sectorId: "sec_4", productTypeId: "pt_17" }, // Kitchen & Dining
  { sectorId: "sec_4", productTypeId: "pt_18" }, // Bedding & Bath
  { sectorId: "sec_4", productTypeId: "pt_15" }, // Garden & Outdoor
  // Outdoor
  { sectorId: "sec_5", productTypeId: "pt_8" }, // Sports Gear
  { sectorId: "sec_5", productTypeId: "pt_9" }, // Outdoor & Camping
  { sectorId: "sec_5", productTypeId: "pt_15" }, // Garden & Outdoor
  // Wellness
  { sectorId: "sec_6", productTypeId: "pt_10" }, // Beauty & Personal Care
  { sectorId: "sec_6", productTypeId: "pt_11" }, // Health & Wellness
  // Knowledge & Hobby
  { sectorId: "sec_7", productTypeId: "pt_5" }, // Books
  { sectorId: "sec_7", productTypeId: "pt_12" }, // Toys & Games
  { sectorId: "sec_7", productTypeId: "pt_19" }, // Musical Instruments
  { sectorId: "sec_7", productTypeId: "pt_20" }, // Art & Craft Supplies
  // Pets & Animals
  { sectorId: "sec_8", productTypeId: "pt_13" }, // Pet Supplies
  // Workspace
  { sectorId: "sec_9", productTypeId: "pt_5" }, // Books
  { sectorId: "sec_9", productTypeId: "pt_7" }, // Office Supplies
  // Mobility & Tools
  { sectorId: "sec_10", productTypeId: "pt_14" }, // Automotive
  { sectorId: "sec_10", productTypeId: "pt_16" }, // Tools & Hardware
];

// 40–100 products per ProductType, generated deterministically.
function generateProducts(): ProductRecord[] {
  const out: ProductRecord[] = [];
  let counter = 0;

  productTypes.forEach((pt, ptIndex) => {
    const count = 40 + ((ptIndex * 7) % 61); // 40..100, deterministic
    for (let i = 1; i <= count; i++) {
      counter += 1;
      const priceCents = (((ptIndex + 1) * 73 + i * 19) % 9900) + 99; // 99..9999
      out.push({
        __typename: "Product",
        id: `p_${counter}`,
        name: `${pt.name} item ${String(i).padStart(3, "0")}`,
        description: `${pt.name} sample product number ${i}, used to exercise pagination.`,
        price: priceCents / 100,
        productTypeId: pt.id,
      });
    }
  });

  return out;
}

export const products: ProductRecord[] = generateProducts();
