"use client";

import { addProductToCart } from "@/actions/add-product-to-cart";
import { useRouter } from "next/navigation";

type AddToCartProps = {
  productId: string;
};

export function AddToCart({ productId }: AddToCartProps) {
  const router = useRouter();

  const handleAddToCart = async () => {
    await addProductToCart(productId);

    router.refresh();
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
