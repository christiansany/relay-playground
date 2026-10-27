/**
 * @generated SignedSource<<dfaa0c68ce2b0246c1e7ffdc4a110d64>>
 * @lightSyntaxTransform
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @dataDrivenDependency ProductPageView_page.blocks {"branches":{"CarouselBlock":{"component":"../blocks/CarouselBlock","fragment":"CarouselBlock_block$normalization.graphql"},"ImageGalleryBlock":{"component":"../blocks/ImageGalleryBlock","fragment":"ImageGalleryBlock_block$normalization.graphql"},"ReviewHighlightBlock":{"component":"../blocks/ReviewHighlightBlock","fragment":"ReviewHighlightBlock_block$normalization.graphql"},"SpecsBlock":{"component":"../blocks/SpecsBlock","fragment":"SpecsBlock_block$normalization.graphql"},"TextBlock":{"component":"../blocks/TextBlock","fragment":"TextBlock_block$normalization.graphql"},"VideoBlock":{"component":"../blocks/VideoBlock","fragment":"VideoBlock_block$normalization.graphql"}},"plural":true}
// @dataDrivenDependency ProductPageView_page.energyLabel {"branches":{"EnergyLabel":{"component":"../blocks/EnergyLabelBadge","fragment":"EnergyLabelBadge_label$normalization.graphql"}},"plural":false}
// @dataDrivenDependency ProductPageView_page.priceDisplay {"branches":{"BundlePrice":{"component":"../prices/BundlePrice","fragment":"BundlePrice_price$normalization.graphql"},"RegularPrice":{"component":"../prices/RegularPrice","fragment":"RegularPrice_price$normalization.graphql"},"SalePrice":{"component":"../prices/SalePrice","fragment":"SalePrice_price$normalization.graphql"}},"plural":false}

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProductPageView_page$data = {
  readonly blocks: ReadonlyArray<{
    readonly __typename: "CarouselBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"CarouselBlock_block">;
  } | {
    readonly __typename: "ImageGalleryBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ImageGalleryBlock_block">;
  } | {
    readonly __typename: "ReviewHighlightBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"ReviewHighlightBlock_block">;
  } | {
    readonly __typename: "SpecsBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"SpecsBlock_block">;
  } | {
    readonly __typename: "TextBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"TextBlock_block">;
  } | {
    readonly __typename: "VideoBlock";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"VideoBlock_block">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }>;
  readonly energyLabel: {
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"EnergyLabelBadge_label">;
  } | null;
  readonly priceDisplay: {
    readonly __typename: "BundlePrice";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"BundlePrice_price">;
  } | {
    readonly __typename: "RegularPrice";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"RegularPrice_price">;
  } | {
    readonly __typename: "SalePrice";
    readonly __fragmentPropName: string | null;
    readonly __module_component: string | null;
    readonly " $fragmentSpreads": FragmentRefs<"SalePrice_price">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
  readonly title: string;
  readonly " $fragmentType": "ProductPageView_page";
};
export type ProductPageView_page$key = {
  readonly " $data"?: ProductPageView_page$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProductPageView_page">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProductPageView_page",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "EnergyLabel",
      "kind": "LinkedField",
      "name": "energyLabel",
      "plural": false,
      "selections": [
        {
          "args": null,
          "documentName": "ProductPageView_page_energyLabel",
          "fragmentName": "EnergyLabelBadge_label",
          "fragmentPropName": "label",
          "kind": "ModuleImport"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "supported",
          "value": "2ABxQN"
        }
      ],
      "concreteType": null,
      "kind": "LinkedField",
      "name": "priceDisplay",
      "plural": false,
      "selections": [
        (v0/*:: as any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page_price",
              "fragmentName": "RegularPrice_price",
              "fragmentPropName": "price",
              "kind": "ModuleImport"
            }
          ],
          "type": "RegularPrice",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page_price",
              "fragmentName": "SalePrice_price",
              "fragmentPropName": "price",
              "kind": "ModuleImport"
            }
          ],
          "type": "SalePrice",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page_price",
              "fragmentName": "BundlePrice_price",
              "fragmentPropName": "price",
              "kind": "ModuleImport"
            }
          ],
          "type": "BundlePrice",
          "abstractKey": null
        }
      ],
      "storageKey": "priceDisplay(supported:\"2ABxQN\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "blocks",
      "plural": true,
      "selections": [
        (v0/*:: as any*/),
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page",
              "fragmentName": "TextBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "TextBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page",
              "fragmentName": "ImageGalleryBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "ImageGalleryBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page",
              "fragmentName": "VideoBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "VideoBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page",
              "fragmentName": "SpecsBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "SpecsBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page",
              "fragmentName": "ReviewHighlightBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "ReviewHighlightBlock",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "documentName": "ProductPageView_page",
              "fragmentName": "CarouselBlock_block",
              "fragmentPropName": "block",
              "kind": "ModuleImport"
            }
          ],
          "type": "CarouselBlock",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ProductPage",
  "abstractKey": null
};
})();

(node as any).hash = "7cddea5b2f56862f63cad0812e5ae325";

export default node;
