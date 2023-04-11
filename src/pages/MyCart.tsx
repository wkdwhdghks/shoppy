import CartItem from "../components/ui/CartItem";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from "react-icons/fa";
import PriceCard from "../components/PriceCard";
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

const SHIPPING: number = 3000;

export default function MyCart(): JSX.Element {
  const {
    cartQuery: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce(
      (prev: any, current: any) =>
        prev + parseInt(current.price) * current.quantity,
      0
    );

  return (
    <section className="p-8">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니에 상품이 없습니다. 열심히 쇼핑해 주세요!</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products &&
              products.map((product: any) => (
                <CartItem key={product.id} product={product} />
              ))}
          </ul>
          <div className="flex justify-between items-center mb-6 px-2 md:px-8 lg:px-16">
            {typeof totalPrice === "number" && (
              <PriceCard text="상품 총액" price={totalPrice} />
            )}
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송액" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            {typeof totalPrice === "number" && (
              <PriceCard text="총가격" price={totalPrice + SHIPPING} />
            )}
          </div>
          <Button text="주문하기" onClick={undefined} />
        </>
      )}
    </section>
  );
}
