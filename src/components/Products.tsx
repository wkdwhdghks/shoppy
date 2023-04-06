import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import { ReactNode } from "react";
import ProductCard from "./ProductCard";

export default function Products(): JSX.Element {
  const {
    isLoading,
    error,
    data: product,
  } = useQuery(["product"], () => getProducts());
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error as ReactNode}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-4 gap-4 p-4">
        {product &&
          product.map((product: any) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
      </ul>
    </>
  );
}
