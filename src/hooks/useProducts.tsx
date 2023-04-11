import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts as fetchProducts, addNewProduct } from "../api/firebase";

export default function useProducts() {
  interface ProductInfo {
    title?: string | undefined;
    price?: string | undefined;
    category?: string | undefined;
    description?: string | undefined;
    options?: string | undefined;
  }

  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], fetchProducts, {
    staleTime: 1000,
  });

  const addProduct: any = useMutation(
    ({ product, url }: { product: ProductInfo; url: string }) =>
      addNewProduct(product, url),
    {
      onSuccess: () => queryClient.invalidateQueries(["product"]),
    }
  );

  return { productsQuery, addProduct };
}
