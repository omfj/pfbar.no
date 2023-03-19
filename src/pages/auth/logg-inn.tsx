import { type GetServerSideProps } from "next";
import { type Provider } from "next-auth/providers";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { BsGoogle, BsDiscord } from "react-icons/bs";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";

const getIcon = (provider: Provider) => {
  switch (provider.id) {
    case "google":
      return <BsGoogle />;
    case "discord":
      return <BsDiscord />;
    default:
      return null;
  }
};

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
        <p className="mb-5 text-center text-xl">
          Du kan logge inn med en av de følgende tjenestene:
        </p>
        <ul className="mx-auto my-10 flex w-fit flex-col justify-center gap-4">
          {Object.values(providers ?? []).map((provider) => (
            <li key={provider.id}>
              <Button
                onClick={() => void signIn(provider.id, { callbackUrl: "/" })}
                className="flex items-center justify-center gap-3"
                fullWidth
              >
                {getIcon(provider)}
                Logg inn med {provider.name}
              </Button>
            </li>
          ))}
        </ul>
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
