import { graphql, useFragment } from "react-relay";
import { useMountLog } from "../runtime/useMountLog.js";
import type { ImageGalleryBlock_block$key } from "./__generated__/ImageGalleryBlock_block.graphql.js";

export default function ImageGalleryBlock({ block }: { block: ImageGalleryBlock_block$key }) {
  const data = useFragment(
    graphql`
      fragment ImageGalleryBlock_block on ImageGalleryBlock {
        images {
          url
          alt
        }
      }
    `,
    block,
  );
  useMountLog("ImageGalleryBlock");
  return (
    <section className="block" style={{ display: "flex", gap: 8 }}>
      {data.images.map((img) => (
        <img key={img.url} src={img.url} alt={img.alt} width={120} height={80} />
      ))}
    </section>
  );
}
