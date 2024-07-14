import ClientLayout from "../pages/Client";
import Home from "../pages/Client/Home";
import About from "../pages/Client/About";
import Services from "../pages/Client/Services";
import Employees from "../pages/Client/Employees";
import EmployeeDetail from "../pages/Client/EmployeeDetail";
import NotFound from "../pages/Client/NotFound";
//admin pages
import AdminLayout from "../pages/Admin";
import Dashboard from "../pages/Admin/Dashboard";
import Users from "../pages/Admin/Users";
import Categories from "../pages/Client/Categories";
import CategoryDetail from "../pages/Client/CategoryDetail"

export const ROUTES = [
  //Client Layout
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "employees/:id",
        element: <EmployeeDetail />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/:id",
        element: <CategoryDetail />,
      },
    ],
  },
  //Admin Layout
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
];
