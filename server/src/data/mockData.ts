export type ProductTypeRecord = {
  __typename: 'ProductType';
  id: string;
  name: string;
};

export type ProductRecord = {
  __typename: 'Product';
  id: string;
  name: string;
  description: string;
  price: number;
  productTypeId: string;
};

export const productTypes: ProductTypeRecord[] = [
  { __typename: 'ProductType', id: 'pt_1', name: 'Beverages' },
  { __typename: 'ProductType', id: 'pt_2', name: 'Snacks' },
  { __typename: 'ProductType', id: 'pt_3', name: 'Electronics' },
];

export const products: ProductRecord[] = [
  {
    __typename: 'Product',
    id: 'p_1',
    name: 'Espresso Beans',
    description: 'Dark roast, 250g bag.',
    price: 12.5,
    productTypeId: 'pt_1',
  },
  {
    __typename: 'Product',
    id: 'p_2',
    name: 'Sparkling Water',
    description: '12-pack of 500ml bottles.',
    price: 9.9,
    productTypeId: 'pt_1',
  },
  {
    __typename: 'Product',
    id: 'p_3',
    name: 'Oolong Tea',
    description: 'Loose-leaf, 100g tin.',
    price: 18.0,
    productTypeId: 'pt_1',
  },
  {
    __typename: 'Product',
    id: 'p_4',
    name: 'Salted Pretzels',
    description: 'Crunchy mini pretzels, 300g.',
    price: 4.2,
    productTypeId: 'pt_2',
  },
  {
    __typename: 'Product',
    id: 'p_5',
    name: 'Dark Chocolate',
    description: '70% cocoa, 100g bar.',
    price: 3.5,
    productTypeId: 'pt_2',
  },
  {
    __typename: 'Product',
    id: 'p_6',
    name: 'Wireless Headphones',
    description: 'Over-ear, 40h battery.',
    price: 199.0,
    productTypeId: 'pt_3',
  },
  {
    __typename: 'Product',
    id: 'p_7',
    name: 'Mechanical Keyboard',
    description: '75% layout, hot-swap.',
    price: 149.0,
    productTypeId: 'pt_3',
  },
  {
    __typename: 'Product',
    id: 'p_8',
    name: 'USB-C Hub',
    description: '7-in-1 adapter.',
    price: 39.9,
    productTypeId: 'pt_3',
  },
];
