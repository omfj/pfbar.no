import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Product } from "@prisma/client";

type ProductWithQuantity = Product & {
  quantity: number;
};

type State = {
  products: Record<string, ProductWithQuantity>;
};

type Actions = {
  addProduct: (productId: Product) => void;
  removeProduct: (product: Product) => void;
  clear: () => void;
};

export const useCartStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      products: {},
      addProduct: (product) => {
        set((state) => {
          const p = state.products[product.id];

          if (p) {
            p.quantity++;
          } else {
            state.products[product.id] = {
              ...product,
              quantity: 1,
            };
          }
        });
      },
      removeProduct: (product) => {
        set((state) => {
          const p = state.products[product.id];

          if (p) {
            p.quantity--;

            if (p.quantity <= 0) {
              delete state.products[product.id];
            }
          }
        });
      },
      clear: () => {
        set((state) => {
          state.products = {};
        });
      },
    })),
    {
      name: "cart",
    }
  )
);
