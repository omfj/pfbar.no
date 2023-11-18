"use client";

import { useCartStore } from "@/stores/cart";

type AddToCartProps = {
  productId: string;
};

export function AddToCart({ productId }: AddToCartProps) {
  const cartStore = useCartStore();

  const handleAddToCart = () => {
    cartStore.addToCart(productId);
  };

  return (
    <button
      className="px-6 py-2 bg-primary rounded-lg"
      onClick={handleAddToCart}
    >
      Legg til i handlekurv
    </button>
  );
}
