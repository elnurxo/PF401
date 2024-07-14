import { Outlet } from "react-router-dom";
import Header from "../../components/Admin/Header";

const AdminLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AdminLayout;
