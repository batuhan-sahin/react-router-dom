import { Outlet } from "react-router-dom";
import NavbarBS from "./components/Navbar";

const RootLayout = () => {
  return (
    <>
      <NavbarBS />
      <Outlet />
    </>
  );
};

export default RootLayout;
