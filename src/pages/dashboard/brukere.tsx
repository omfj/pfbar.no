import { type GetServerSideProps } from "next";
import Head from "next/head";

import Container from "@/components/container";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";

const UsersPage: React.FC = () => {
  const { data: users } = api.dashboard.getUsers.useQuery();

  return (
    <>
      <Head>
        <title>Brukere</title>
      </Head>
      <Container className="mx-auto w-full max-w-4xl">
        <h1 className="mb-3 text-4xl font-bold">Brukere</h1>
        <p className="text-lg">Oversikt over alle brukere</p>

        <ul className="my-10 flex flex-col gap-2">
          {users?.map((user) => (
            <li key={user.id}>
              <div className="border border-black p-3">
                <p>
                  <span className="font-semibold">ID:</span> {user.id}
                </p>
                <p>
                  <span className="font-semibold">Navn:</span> {user.name}
                </p>
                <p>
                  <span className="font-semibold">E-post:</span> {user.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user.role === "ADMIN") {
    return {
      props: {
        session,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

export default UsersPage;
