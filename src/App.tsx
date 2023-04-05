import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
