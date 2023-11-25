import { Container } from "@/components/ui/container";
import { getAllProducts } from "@/lib/models";
import Link from "next/link";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <Container as="main">
      <div className="py-10">
        <h1 className="text-8xl font-semibold mb-4">🦩 Pink Flamingo</h1>

        <p className="text-2xl font-light">
          Opplev den sjarmerende atmosfæren på Pink Flamingo, en koselig liten
          bar på et loft i hjertet av Trondheim. Her finner du varm gjestfrihet
          og smakfulle drinker, hvor hver kveld er et eventyr.
        </p>
      </div>

      <div className="max-w-6xl w-full mx-auto my-10 grid grid-cols-2 gap-6">
        {products.map((product) => {
          return (
            <Link key={product.id} href={`/produkt/${product.id}`}>
              <div
                key={product.id}
                className="h-40 group shadow-lg rounded-3xl border-2 flex flex-col bg-gradient-to-br border-black from-primary to-white items-center justify-center text-center p-4"
              >
                <h2 className="group-hover:underline text-3xl font-medium">
                  {product.name}
                </h2>
                <p className="text-xl text-gray-800">{product.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
