import { Outlet } from "react-router-dom";
import Header from "../../components/Client/Header";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ClientLayout;
