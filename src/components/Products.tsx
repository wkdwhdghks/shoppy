import { ReactNode } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";

export default function Products(): JSX.Element {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error as ReactNode}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {products &&
          products.map((product: any) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </ul>
    </>
  );
}
