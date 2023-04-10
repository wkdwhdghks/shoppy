import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout } from "../api/firebase";
import User from "./User";
import Button from "./ui/Button";
import CartStatus from "./CartStatus";

export default function Navbar({ user }: { user: any }): JSX.Element {
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">{user && <CartStatus user={user} />}</Link>
        {user && user.isAdmin && (
          <Link to="/products/new" className="text-2xl">
            <BsFillPencilFill />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <Button text={"login"} onClick={login}></Button>}
        {user && <Button text={"logout"} onClick={logout}></Button>}
      </nav>
    </header>
  );
}
