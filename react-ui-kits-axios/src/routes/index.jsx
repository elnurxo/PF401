import Home from "../pages/Home";
import Songs from "../pages/Songs";
import AddSong from "../pages/AddSong";
import SongDetail from "../pages/SongDetail";
import NotFound from "../pages/NotFound";
import Todo from "../pages/Todo";
import MainLayout from "../components/MainLayout";
import Favorites from "../pages/Favorites";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import EditSong from "../pages/EditSong";
import Albums from "../pages/Albums";
import User from "../pages/User";
import AdminLayout from "../components/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Orders from "../pages/Orders";
import AdminPrivateRoute from "../components/AdminPrivateRoute";
import AdminLogin from "../pages/AdminLogin";

export const ROUTES = [
  {
    element: <MainLayout />,
    path: "/",
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "songs",
        element: (
          <PrivateRoute>
            <Songs />
          </PrivateRoute>
        ),
      },
      {
        path: "user",
        element: (
          <PrivateRoute>
            <User />
          </PrivateRoute>
        ),
      },
      {
        path: "albums",
        element: (
          <PrivateRoute>
            <Albums />
          </PrivateRoute>
        ),
      },
      {
        path: "add-song",
        element: (
          <PrivateRoute>
            <AddSong />
          </PrivateRoute>
        ),
      },
      {
        path: "songs/:id",
        element: (
          <PrivateRoute>
            <SongDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "edit/:id",
        element: (
          <PrivateRoute>
            <EditSong />
          </PrivateRoute>
        ),
      },
      {
        path: "todo",
        element: <Todo />,
      },
      {
        path: "favorites",
        element: (
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    path: "/admin",
    children: [
      {
        index: true,
        element: (
          <AdminPrivateRoute>
            <Dashboard />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <AdminPrivateRoute>
            <Orders />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
    ],
  },
];
