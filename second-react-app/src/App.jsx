import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/index.jsx";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
