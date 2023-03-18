import Container from "@/components/container";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSideProps } from "next";
import { type Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

type Props = {
  providers: Array<Provider>;
};

const SignInPage: React.FC<Props> = ({ providers }) => {
  return (
    <>
      <Head>
        <title>Logg inn</title>
      </Head>
      <Container>
        <h1 className="mb-3 text-center text-5xl font-bold">
          Velg en måte å logge inn på
        </h1>
        <p className="mb-10 text-center text-xl">
          Du kan logge inn med en av de følgende tjenestene:
        </p>
        <div className="my-10">
          <ul className="mx-auto w-fit">
            {Object.values(providers ?? []).map((provider) => (
              <li key={provider.id}>
                <button
                  className="border border-black bg-black px-4 py-2 font-bold text-white transition-colors duration-150 hover:bg-white hover:text-black"
                  onClick={() => void signIn(provider.id, { callbackUrl: "/" })}
                >
                  Logg inn med {provider.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const providers = await getProviders();

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      providers,
    },
  };
};

export default SignInPage;
