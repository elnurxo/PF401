
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {ROUTES} from "./routes";

const routes = createBrowserRouter(ROUTES);

function App() {

  return (
   <>
    <RouterProvider router={routes}></RouterProvider>
   </>
  )
}

export default App
