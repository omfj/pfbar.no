"use client";

import { mutateCart } from "@/actions/cart-actions";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

type QuantityButtonProps = {
  productId: string;
  quantity: number;
};

export function QuantityButton({ productId, quantity }: QuantityButtonProps) {
  const router = useRouter();

  const handleAddToCart = async () => {
    await mutateCart("add", productId);

    router.refresh();
  };

  const handleRemoveFromCart = async () => {
    await mutateCart("remove", productId);

    router.refresh();
  };

  return (
    <div className="border flex items-center rounded-xl divide-x">
      <button onClick={handleRemoveFromCart}>
        <Minus className="px-1" />
      </button>
      <p className="text-2xl px-4 py-1">{quantity}</p>
      <button onClick={handleAddToCart}>
        <Plus className="px-1" />
      </button>
    </div>
  );
}
