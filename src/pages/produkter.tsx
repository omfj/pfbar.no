import { type Product } from "@prisma/client";
import toast from "react-hot-toast";
import Head from "next/head";

import { prisma } from "@/server/db";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import Container from "@/components/container";

type Props = {
  products: Array<Product>;
};

const ProductPage: React.FC<Props> = ({ products }) => {
  const addToCart = useCartStore((state) => state.addProduct);

  return (
    <>
      <Head>
        <title>Produkter</title>
      </Head>
      <Container className="mx-auto w-full max-w-5xl">
        <h1 className="text-4xl font-bold">Produkter</h1>
        <p className="text-xl">Tom for drikke? Frykt ikke, her er det masse!</p>
        <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {products.map((product) => (
            <div key={product.id} className="border border-black p-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <p className="text-lg">{product.description}</p>
              <Button
                onClick={() => {
                  addToCart(product);
                  toast.success(`${product.name} lagt til i handlekurv`);
                }}
                className="mt-4"
              >
                Legg til i handlekurv
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export const getStaticProps = async () => {
  const products = await prisma.product.findMany();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)) as Array<Product>,
    },
  };
};

export default ProductPage;
