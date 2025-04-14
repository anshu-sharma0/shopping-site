import { createContext, useState } from 'react';

const ProductContext = createContext({
  product: [],
  setProduct: () => {},
});

const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
