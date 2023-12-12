import { graphql, useLazyLoadQuery } from "react-relay";
import { pagesQuery } from "../../__generated__/pagesQuery.graphql";
import Link from "next/link";

export default function Home() {
  const data = useLazyLoadQuery<pagesQuery>(
    graphql`
      query pagesQuery {
        products(first: 5, sortKey: ID, reverse: false) {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
    {}
  );

  return (
    <ul>
      {data.products.edges.map(({ node }) => (
        <li key={node.id}>
          <Link href={`/product/${encodeURIComponent(node.id)}`}>
            {node.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
