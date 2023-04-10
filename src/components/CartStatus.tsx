import { useQuery } from "@tanstack/react-query";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getCart } from "../api/firebase";

export default function CartStatus({ user }: { user: any }): JSX.Element {
  const { data: products } = useQuery(["carts"], () => getCart(user.uid));
  return (
    <div className="relative">
      <AiOutlineShoppingCart className="text-4xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2">
          {products.length}
        </p>
      )}
    </div>
  );
}
