import Container from "@/components/container";
import { dashboardRoutes } from "@/lib/routes";
import { getServerAuthSession } from "@/server/auth";
import { type GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";

const DashboardPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Container className="text-center">
        <h1 className="mb-3 text-4xl font-bold">Dashboard</h1>

        <ul className="flex flex-col gap-2 text-lg">
          {dashboardRoutes.map((route) => (
            <li key={route.path}>
              <Link
                className="font-semibold underline hover:text-blue-500 hover:no-underline"
                href={route.path}
              >
                {route.name}
              </Link>
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

export default DashboardPage;
