import {
  PreloadedQuery,
  graphql,
  loadQuery,
  useFragment,
  usePreloadedQuery,
} from "react-relay";
import {
  IdQuery,
  default as QueryNode,
} from "../../../__generated__/IdQuery.graphql";
import { IdProductName$key } from "../../../__generated__/IdProductName.graphql";
import { IdProductDescription$key } from "../../../__generated__/IdProductDescription.graphql";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";
import { relayEnvironment } from "@/RelayEnvironment";

export default function ProductPage({
  queryRef,
}: {
  queryRef: PreloadedQuery<IdQuery>;
}) {
  const router = useRouter();
  const id = decodeURIComponent(router.query.id as string);
  const { product } = usePreloadedQuery<IdQuery>(
    graphql`
      query IdQuery($id: ID!) {
        product(id: $id) {
          ...IdProductName
          ...IdProductDescription
        }
      }
    `,
    queryRef
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <p>
        Product: {id}
        <br />
        <ProductName productRef={product} />
      </p>

      <Suspense fallback={<p>Waiting for description...</p>}>
        <ProductDescription productRef={product} />
      </Suspense>
    </>
  );
}

ProductPage.getInitialProps = (ctx: NextPageContext) => {
  if (typeof window === "undefined") {
    return {};
  }

  const id = decodeURIComponent(ctx.query.id as string);
  const queryRef = loadQuery(relayEnvironment!, QueryNode, { id: id });

  return { queryRef };
};

function ProductName({ productRef }: { productRef: IdProductName$key }) {
  const product = useFragment(
    graphql`
      fragment IdProductName on Product {
        name
      }
    `,
    productRef
  );

  return <>Name: {product.name}</>;
}

function ProductDescription({
  productRef,
}: {
  productRef: IdProductDescription$key;
}) {
  const product = useFragment(
    graphql`
      fragment IdProductDescription on Product {
        description
      }
    `,
    productRef
  );

  return <p>Description: {product.description}</p>;
}
