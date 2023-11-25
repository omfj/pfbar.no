import { getSession } from "@/auth/utils";
import { MakeOrderButton } from "@/components/make-order-button";
import { Container } from "@/components/ui/container";
import { Product, products } from "@/db/schemas";
import { getCartByUserId, getProductById } from "@/lib/models";
import { Minus, Plus } from "lucide-react";
import { QuantityButton } from "./quantity-button";
import { Heading } from "@/components/ui/heading";

export default async function Cart() {
  const session = await getSession();

  if (!session) {
    return (
      <main className="max-w-6xl mx-auto my-10">
        <p className="text-center">
          Du må være logget inn for å se innholdet i handlekurven din.
        </p>
      </main>
    );
  }

  return (
    <Container as="main">
      <Heading>Din handlekurv</Heading>

      <ProductsInCart userId={session.user.id} />
    </Container>
  );
}

type ProductsInCartProps = {
  userId: string;
};

async function ProductsInCart({ userId }: ProductsInCartProps) {
  const cart = await getCartByUserId(userId);
  const productIds = Object.keys(cart?.content ?? {});
  const products = await Promise.all(
    productIds.map(async (productId) => {
      const product = await getProductById(productId);

      return {
        ...product,
        quantity: cart?.content?.[productId],
      };
    })
  );
  const validProducts = products.filter(
    (product): product is Product & { quantity: number } =>
      product && (product.quantity ?? -1) > 0
  );

  if (validProducts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto my-10">
        <p className="text-center">Handlekurven din er tom.</p>
      </div>
    );
  }

  return (
    <div className="py-10">
      <ul className="divide-y">
        {validProducts.map((product) => (
          <li key={product.id}>
            <div className="flex items-center justify-between p-4 rounded-2xl">
              <div>
                <p className="text-3xl font-medium">{product.name}</p>
              </div>
              <div>
                <QuantityButton
                  productId={product.id}
                  quantity={product.quantity}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <MakeOrderButton />
    </div>
  );
}
