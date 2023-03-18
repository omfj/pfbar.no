import { type GetServerSideProps } from "next";
import Head from "next/head";
import type { OrderItem, Product, Order, User } from "@prisma/client";
import { format } from "date-fns";
import nbLocale from "date-fns/locale/nb";

import Container from "@/components/container";
import { getServerAuthSession } from "@/server/auth";
import { prisma } from "@/server/db";
import { capitalize } from "@/utils/string";
import { Separator } from "@/components/ui/separator";

type OrderWithItems = Order & {
  items: Array<
    OrderItem & {
      product: Product;
    }
  >;
  user: User;
};

type Props = {
  orders: Array<OrderWithItems>;
};

const OrdersPage: React.FC<Props> = ({ orders }) => {
  return (
    <>
      <Head>
        <title>Bestillinger</title>
      </Head>
      <Container className="mx-auto w-full max-w-4xl">
        <h1 className="mb-3 text-4xl font-bold">Brukere</h1>
        <p className="text-lg">Oversikt over alle brukere</p>

        <ul className="my-10 flex flex-col gap-2">
          {orders.map((order) => (
            <li key={order.id}>
              <div className="border border-black p-3">
                <p>
                  <span className="font-semibold">ID:</span> {order.id}
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
                <p>
                  <span className="font-semibold">Av:</span> {order.user.name}
                </p>

                <Separator className="my-2" />

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
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (session?.user.role === "ADMIN") {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    return {
      props: {
        session,
        orders: JSON.parse(JSON.stringify(orders)) as Array<OrderWithItems>,
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

export default OrdersPage;
