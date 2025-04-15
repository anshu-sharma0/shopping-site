import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../App";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/cart";
import Login from "../components/login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);
