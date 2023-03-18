import Container from "@/components/container";
import Head from "next/head";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Container className="flex h-full flex-col text-center">
        <h1 className="mb-3 text-[10rem] font-bold md:text-[20rem]">404</h1>
        <p className="text-xl">Denne siden finnes ikke.</p>

        <Link
          className="my-10 mx-auto w-full max-w-3xl border border-black bg-black p-4 text-center text-white transition-colors duration-150 hover:bg-white hover:text-black"
          href="/"
        >
          Ta meg hjem!
        </Link>
      </Container>
    </>
  );
};

export default NotFoundPage;
