import { type GetServerSideProps } from "next";
import { format } from "date-fns";
import nbLocale from "date-fns/locale/nb";
import Head from "next/head";

import Container from "@/components/container";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { capitalize } from "@/utils/string";

const ProfilePage: React.FC = () => {
  const { data: userInfo } = api.profile.me.useQuery();

  return (
    <>
      <Head>
        <title>Profil</title>
      </Head>
      <Container className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-bold">Profil</h1>
        <p className="text-xl">Her kan du endre på din profil</p>

        <div className="my-10 flex flex-col gap-4">
          <p className="text-xl">
            <span className="font-semibold">Navn:</span> {userInfo?.name}
          </p>
          <p className="text-xl">
            <span className="font-semibold">E-post:</span> {userInfo?.email}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-3xl font-semibold">Bestillinger</h2>
          <ul className="flex flex-col gap-3">
            {userInfo?.orders.map((order) => (
              <li key={order.id}>
                <div className="border border-black p-3">
                  <p>
                    <span className="font-semibold">Ordrenummer:</span>{" "}
                    {order.id}
                  </p>
                  <p>
                    <span className="font-semibold">Bestilt:</span>{" "}
                    {capitalize(
                      format(
                        new Date(order.createdAt),
                        "EEEE dd. MMM yyy HH:mm",
                        {
                          locale: nbLocale,
                        }
                      )
                    )}
                  </p>
                  <p className="font-semibold">Produkter:</p>
                  <ul className="list-disc pl-5">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        <p>
                          {item.quantity}x {item.product.name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
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

  if (!session) {
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
    },
  };
};

export default ProfilePage;
