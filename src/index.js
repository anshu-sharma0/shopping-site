import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router";
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ProductProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
           <ProductProvider>
      <RouterProvider router={router} />
      </ProductProvider>
  </React.StrictMode>
);
