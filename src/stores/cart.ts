import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  products: Record<
    string,
    {
      quantity: number;
    }
  >;
};

type Actions = {
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
};

export const useCartStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      products: {},
      addToCart: (productId) => {
        const { products } = get();

        set({
          products: {
            ...products,
            [productId]: {
              quantity: (products[productId]?.quantity ?? 0) + 1,
            },
          },
        });
      },
      removeFromCart: (productId) => {
        const { products } = get();

        const newProducts = { ...products };
        delete newProducts[productId];

        set({
          products: newProducts,
        });
      },
      updateQuantity: (productId, quantity) => {
        const { products } = get();

        set({
          products: {
            ...products,
            [productId]: {
              ...products[productId],
              quantity,
            },
          },
        });
      },
    }),
    {
      name: "cart",
      getStorage: () => localStorage,
    }
  )
);
