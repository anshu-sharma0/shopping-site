import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../App";
import PrivateRoute from "./PrivateRoute";
import Cart from "../pages/cart";
import Login from "../components/login";
import Form from "../components/form";
import Products from "../components/products";
import LocalCart from "../pages/localCart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/form",
        element: <Form />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/localCart",
        element: <LocalCart />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);
