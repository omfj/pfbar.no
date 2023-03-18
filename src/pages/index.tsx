import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Container from "@/components/container";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Pink Flamingo</title>
      </Head>
      <main>
        <Container className="max-w-3xl gap-5">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            For i kveld er det lov å være...
          </h1>

          <p className="my-5 max-w-xl text-lg">
            Velkommen til Pink Flamingo – din digitale baropplevelse! Vi har
            skapt en plattform som lar deg nyte deilig drikke uten å stå i kø
            eller vente på en servitør.
          </p>

          <Link
            className="border border-black bg-black p-3 text-center text-white transition-colors duration-150 hover:bg-white hover:text-black"
            href="/produkter"
          >
            Bestill nå!
          </Link>
        </Container>
      </main>
    </>
  );
};

export default Home;
