import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { BsFillPencilFill } from "react-icons/bs";
import { login, logout, onUserStateChange } from "../api/firebase";
import { useEffect, useState } from "react";

export default function Navbar(): JSX.Element {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user: any) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then((user) => setUser(user as any));
  };

  const handleLogout = () => {
    logout().then((user) => setUser(user as any));
  };

  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag />
        <h1>Shoppy</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/carts">Carts</Link>
        <Link to="/products/new" className="text-2xl">
          <BsFillPencilFill />
        </Link>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
