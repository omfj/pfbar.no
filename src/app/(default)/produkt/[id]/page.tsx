import { AddToCart } from "@/components/add-to-cart-button";
import { getProductById } from "@/lib/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: {
    id: string;
  };
};

const getData = cache(async (id: string) => {
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return product;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getData(params.id);

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function Product({ params }: Props) {
  const product = await getData(params.id);

  return (
    <main className="max-w-6xl mx-auto my-10 grid grid-cols-2">
      <div></div>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-4xl font-medium">{product.name}</h1>
          <p className="text-xl text-gray-800">{product.description}</p>
        </div>

        <AddToCart productId={product.id} />
      </div>
    </main>
  );
}
