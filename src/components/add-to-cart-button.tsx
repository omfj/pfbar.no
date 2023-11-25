"use client";

import { mutateCart } from "@/actions/cart-actions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

type AddToCartProps = {
  productId: string;
};

export function AddToCart({ productId }: AddToCartProps) {
  const router = useRouter();

  const handleAddToCart = async () => {
    await mutateCart("add", productId);

    router.refresh();
  };

  return <Button onClick={handleAddToCart}>Legg til i handlekurv</Button>;
}
