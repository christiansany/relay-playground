import { graphql, useFragment } from "react-relay";
import type { SectorProductsSection_sector$key } from "./__generated__/SectorProductsSection_sector.graphql.js";

type Props = {
  sectorRef: SectorProductsSection_sector$key;
};

export function SectorProductsSection({ sectorRef }: Props) {
  const data = useFragment(
    graphql`
      fragment SectorProductsSection_sector on Sector @catch(to: RESULT) {
        id
        name
        products(first: 20) @catch(to: RESULT) {
          edges {
            node {
              id
              name
              price
            }
          }
        }
      }
    `,
    sectorRef,
  );

  if (!data.ok) {
    return (
      <section>
        <h2>All products</h2>
        <p>Outer @catch fired — couldn't load this sector's product overview.</p>
      </section>
    );
  }

  const { name, products } = data.value;

  return (
    <section>
      <h2>All products in {name}</h2>
      {products.ok ? (
        <ul>
          {products.value.edges.map((edge) => (
            <li key={edge.node.id}>
              {edge.node.name} — CHF {edge.node.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>Inner @catch fired — couldn't load products for this sector.</p>
      )}
    </section>
  );
}
