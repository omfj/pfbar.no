import toast from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Container from "@/components/container";
import { useCartStore } from "@/stores/cart";
import { api } from "@/utils/api";
import Head from "next/head";

const CartPage = () => {
  const [myCart, setMyCart] = useState<typeof products>();
  const orderMutation = api.order.makeOrder.useMutation();

  const products = useCartStore((state) => state.products);
  const removeFromCart = useCartStore((state) => state.removeProduct);
  const clearCart = useCartStore((state) => state.clear);

  const cartIsEmpty = Object.keys(myCart ?? {}).length <= 0;

  useEffect(() => {
    setMyCart(products);
  }, [products]);

  const handleOrder = async () => {
    try {
      const productsOrder = Object.entries(myCart ?? {}).map(
        ([id, product]) => ({
          productId: id,
          quantity: product.quantity,
        })
      );

      if (productsOrder.length <= 0) {
        toast.error("Handlekurven er tom");
        return;
      }

      const order = await orderMutation.mutateAsync({
        products: productsOrder,
      });

      if (order) {
        toast.success("Bestillingen er registrert");
        clearCart();
      }
    } catch {
      toast.error("Du er ikke logget inn!");
    }
  };

  return (
    <>
      <Head>
        <title>Handlekurv</title>
      </Head>
      <Container className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-bold">Handlekurv</h1>
        <p className="text-xl">Her er produktene i din handlekurv.</p>
        <div className="my-10 flex  flex-col gap-4">
          {cartIsEmpty && <p className="text-xl">Handlekurven er tom.</p>}
          {Object.entries(myCart ?? {}).map(([id, product]) => (
            <div key={id} className="flex items-center border border-black p-4">
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <p className="text-lg">{product.description}</p>
                <p className="text-lg">Antall: {product.quantity}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    removeFromCart(product);
                    toast.success("Produkt fjernet fra handlekurv");
                  }}
                  className="border border-black bg-red-400 p-2 text-black"
                >
                  <TrashIcon className="h-6 w-6" title="Slett produkt" />
                </button>
              </div>
            </div>
          ))}
          {!cartIsEmpty && (
            <Button onClick={() => void handleOrder()}>Bestill</Button>
          )}
        </div>
      </Container>
    </>
  );
};

export default CartPage;
