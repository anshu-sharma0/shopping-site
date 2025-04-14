import { createBrowserRouter } from "react-router-dom";
import Home from "./App";
import Cart from "./pages/cart";
import Products from "./pages/products";
import Layout from "./layout";

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
          path: "/products",
          element: <Products />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
  ]);
