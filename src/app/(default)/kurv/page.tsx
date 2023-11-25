import { getSession } from "@/auth/utils";
import { MakeOrderButton } from "@/components/make-order-button";
import { Container } from "@/components/ui/container";
import { products } from "@/db/schemas";
import { getCartByUserId, getProductById } from "@/lib/models";

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

  const cart = await getCartByUserId(session.user.id);

  const products = await Promise.all(
    Object.keys(cart?.content ?? {}).map((productId) =>
      getProductById(productId).then((product) => ({
        ...product,
        quantity: cart?.content?.[productId] ?? 0,
      }))
    )
  ).then((products) => {
    return products.filter((product) => product.quantity > 0);
  });

  return (
    <Container as="main">
      <h1 className="text-3xl font-medium">Din handlekurv</h1>

      <ul className="space-y-8">
        {products.map((product) => (
          <li key={product.id}>
            <div className="flex items-center justify-between border p-4 rounded-2xl">
              <div>
                <p className="text-2xl font-bold">{product.name}</p>
              </div>
              <div>
                <p className="text-5xl">{product.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <MakeOrderButton />
    </Container>
  );
}
