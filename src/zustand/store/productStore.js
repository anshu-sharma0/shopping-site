import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductStore = create(
  persist(
    (set) => ({
      product: [],
      allProduct: [],
      user: null,
      addItem: (item) => set((state) => {
        const existingItemIndex = state.product.findIndex(p => p.id === item.id);
        if (existingItemIndex >= 0) {
          const updatedItems = [...state.product];
          updatedItems[existingItemIndex].quantity += 1;
          return { product: updatedItems };
        } else {
          return { product: [...state.product, { ...item, quantity: 1 }] };
        }
      }),

      removeItem: (itemId) => set((state) => ({
        product: state.product.filter((p) => p.id !== itemId),
      })),

      increaseQuantity: (itemId) => set((state) => ({
        product: state.product.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })),

      decreaseQuantity: (itemId) => set((state) => ({
        product: state.product.map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter((item) => item.quantity > 0),
      })),

      updateQuantity: (itemId, quantity) => set((state) => ({
        product: state.product.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      })),

      setUser: (userData) => set(() => ({ user: userData })),
      clearUser: () => set(() => ({ user: null })),
      setAllProduct: (allProduct) => set(() => ({ allProduct })),
    }),
    {
      name: 'product-cart',
      getStorage: () => localStorage,
    }
  )
);

export default useProductStore;
