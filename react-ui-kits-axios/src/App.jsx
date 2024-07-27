import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes";
import { FavoritesProvider } from "./services/context/favoriteContext.jsx";
import { AuthProvider } from "./services/context/authContext.jsx";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <RouterProvider router={routes}></RouterProvider>;
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
