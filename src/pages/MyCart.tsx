import { useOutletContext } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import CartItem from "../components/ui/CartItem";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";

const SHIPPING: number = 3000;

export default function MyCart(): JSX.Element {
  interface User {
    user: any;
  }

  const { user } = useOutletContext<User>();

  const { isLoading, data: products } = useQuery(["carts"], () =>
    getCart(user.uid)
  );

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev: any, current: any) =>
        prev + parseInt(current.price) * current.quantitiy,
      0
    );

  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts && (
        <>
          <ul>
            {products &&
              products.map((product: any) => (
                <CartItem key={product.id} product={product} uid={user.uid} />
              ))}
          </ul>
          <div>
            <PriceCard text="상품 총액" price={totalPrice as number} />
            <BsFillPlusCircleFill />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals />
            <PriceCard
              text="총가격"
              price={(totalPrice as number) + SHIPPING}
            />
          </div>
        </>
      )}
    </section>
  );
}
