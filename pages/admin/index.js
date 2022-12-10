import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const supabase = useSupabaseClient();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select(
            `
            id,
            created_at,
            product: products (
              name
            ),
            user: profiles (
              full_name
            )
            `
          )
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data) {
          const orders = [];
          data.forEach((order) => {
            orders.push({
              id: order.id,
              createdAt: order.created_at,
              product: order.product.name,
              name: order.user.full_name ?? "Ukjent",
            });
          });
          setOrders(orders);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id, name, description");

        if (error) throw error;

        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
    fetchProducts();
  }, [supabase]);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-5">Admin-side</h1>
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-2">
        <div className="border border-black p-1">
          <h2 className="font-bold text-xl py-4">Bestillinger</h2>
          <ul className="flex flex-col gap-5">
            {orders.map((order) => (
              <li key={order.id}>
                <p>Ordrenummer: {order.id}</p>
                <p>Bestilt: {order.createdAt}</p>
                <p>Produkt: {order.product}</p>
                <p>Kjøper: {order.name}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-black p-1">
          <h2 className="font-bold text-xl py-4">Produkter</h2>
          <ul className="flex flex-col gap-5">
            {products.map((product) => (
              <li key={product.id}>
                <p>Produktnummer: {product.id}</p>
                <p>Navn: {product.name}</p>
                <p>Beskrivelse: {product.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const { data } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", session.user.id)
    .single();

  if (!data || data.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
    },
  };
};

export default AdminPage;
