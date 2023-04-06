import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout, onUserStateChange } from "../api/firebase";
import { useEffect, useState } from "react";
import User from "./User";
import Button from "./Button";

export default function Navbar(): JSX.Element {
  interface UserInfo {
    photoURL: string;
    displayName: string;
    isAdmin: string;
  }
  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    onUserStateChange((user: any) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
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
