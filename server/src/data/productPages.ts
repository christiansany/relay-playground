// Mock data for the Data-Driven Dependencies (3D) demo. See
// docs/data-driven-dependencies.md.

export type BlockRecord =
  | { __typename: "TextBlock"; id: string; heading: string; body: string }
  | { __typename: "ImageGalleryBlock"; id: string; images: { url: string; alt: string }[] }
  | {
      __typename: "VideoBlock";
      id: string;
      title: string;
      videoUrl: string;
      durationSeconds: number;
    }
  | { __typename: "SpecsBlock"; id: string; specs: { label: string; value: string }[] }
  | {
      __typename: "ReviewHighlightBlock";
      id: string;
      rating: number;
      quote: string;
      author: string;
    }
  | { __typename: "CarouselBlock"; id: string; title: string; items: BlockRecord[] }
  | { __typename: "ComparisonBlock"; id: string; competitors: string[] };

export type PriceRecord =
  | { __typename: "RegularPrice"; id: string; amount: number }
  | {
      __typename: "SalePrice";
      id: string;
      amount: number;
      originalAmount: number;
      endsAt: string;
    }
  | { __typename: "BundlePrice"; id: string; amount: number; bundleItems: string[] };

export type ProductPageRecord = {
  id: string;
  slug: string;
  title: string;
  blocks: BlockRecord[];
  energyLabel: { id: string; grade: string; kwhPerYear: number } | null;
  /**
   * Price strategies the product qualifies for, best first. The
   * `priceDisplay(supported:)` resolver returns the first one the client
   * supports.
   */
  prices: PriceRecord[];
};

export const productPages: ProductPageRecord[] = [
  {
    id: "pp_espresso",
    slug: "espresso-machine",
    title: "Barista Pro Espresso Machine",
    blocks: [
      {
        __typename: "TextBlock",
        id: "blk_1",
        heading: "Café quality at home",
        body: "15 bar pump, PID temperature control and a steam wand that actually textures milk.",
      },
      {
        __typename: "ImageGalleryBlock",
        id: "blk_2",
        images: [
          { url: "https://picsum.photos/seed/espresso1/240/160", alt: "Front view" },
          { url: "https://picsum.photos/seed/espresso2/240/160", alt: "Steam wand" },
          { url: "https://picsum.photos/seed/espresso3/240/160", alt: "Portafilter" },
        ],
      },
      {
        __typename: "SpecsBlock",
        id: "blk_3",
        specs: [
          { label: "Pressure", value: "15 bar" },
          { label: "Water tank", value: "2 l" },
          { label: "Weight", value: "8.2 kg" },
        ],
      },
      {
        __typename: "ReviewHighlightBlock",
        id: "blk_4",
        rating: 4.7,
        quote: "Best espresso I've had outside of Italy.",
        author: "Maria",
      },
    ],
    energyLabel: { id: "el_espresso", grade: "B", kwhPerYear: 145 },
    prices: [
      {
        __typename: "SalePrice",
        id: "price_espresso_sale",
        amount: 499,
        originalAmount: 649,
        endsAt: "2026-11-30",
      },
      { __typename: "RegularPrice", id: "price_espresso_regular", amount: 649 },
    ],
  },
  {
    id: "pp_headphones",
    slug: "noise-cancelling-headphones",
    title: "Silence 900 Noise-Cancelling Headphones",
    blocks: [
      {
        __typename: "TextBlock",
        id: "blk_10",
        heading: "Hear nothing but your music",
        body: "Adaptive noise cancelling with 40 hours of battery life.",
      },
      {
        __typename: "VideoBlock",
        id: "blk_11",
        title: "Unboxing",
        videoUrl: "https://example.com/unboxing.mp4",
        durationSeconds: 184,
      },
      {
        __typename: "CarouselBlock",
        id: "blk_12",
        title: "In the box",
        items: [
          {
            __typename: "TextBlock",
            id: "blk_13",
            heading: "Travel case",
            body: "Hard shell, fits in any backpack.",
          },
          {
            __typename: "ImageGalleryBlock",
            id: "blk_14",
            images: [{ url: "https://picsum.photos/seed/case/240/160", alt: "Case" }],
          },
        ],
      },
      {
        __typename: "ComparisonBlock",
        id: "blk_15",
        competitors: ["Brand A Q45", "Brand B XM9"],
      },
    ],
    energyLabel: null,
    prices: [
      {
        __typename: "BundlePrice",
        id: "price_headphones_bundle",
        amount: 379,
        bundleItems: ["Headphones", "Extra ear cushions", "Airplane adapter"],
      },
      { __typename: "RegularPrice", id: "price_headphones_regular", amount: 349 },
    ],
  },
  {
    id: "pp_notebook",
    slug: "paper-notebook",
    title: "A5 Dotted Paper Notebook",
    blocks: [
      {
        __typename: "TextBlock",
        id: "blk_20",
        heading: "Just a notebook",
        body: "This page only uses TextBlock, so no other block chunk should be downloaded.",
      },
    ],
    energyLabel: null,
    prices: [{ __typename: "RegularPrice", id: "price_notebook_regular", amount: 12.9 }],
  },
];
