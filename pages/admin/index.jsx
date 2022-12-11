import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminOrder from "../../components/AdminOrder";
import AdminProduct from "../../components/AdminProduct";
import Button from "../../components/Button";

const AdminPage = () => {
  const supabase = useSupabaseClient();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
          .select("id, name, description")
          .order("id", { ascending: false });

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
    <>
      <div className="px-3 md:px-5">
        <h1 className="text-4xl font-bold text-center mb-5">Admin-side</h1>
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <div className="p-1">
            <h2 className="font-bold text-2xl py-4">Bestillinger</h2>
            <ul className="flex flex-col gap-5">
              {orders.map((order) => (
                <AdminOrder key={order.id} order={order} />
              ))}
            </ul>
          </div>
          <div className="p-1">
            <h2 className="font-bold text-2xl py-4">Produkter</h2>
            <div className="flex flex-col gap-1">
              <Button modifier="outline" onClick={() => setShowModal(true)}>
                Lag nytt produkt
              </Button>
              <ul className="flex flex-col gap-5">
                {products.map((product) => (
                  <AdminProduct key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-5">Lag nytt produkt</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const { name, description } = e.target.elements;
                try {
                  const { data, error } = await supabase
                    .from("products")
                    .insert({
                      name: name.value,
                      description: description.value,
                    })
                    .select();

                  if (error) throw error;

                  if (data) {
                    setProducts((prev) => [data[0], ...prev]);
                    setShowModal(false);
                    toast.success("Nytt produkt ble laget");
                  }
                } catch (error) {
                  console.log(error);
                  toast.error("Noe gikk galt");
                }
              }}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Navn:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border border-black rounded-md p-2"
                />
                <label htmlFor="description">Beskrivelse:</label>
                <textarea
                  name="description"
                  id="description"
                  className="border border-black rounded-md p-2"
                />
                <Button type="submit">Lagre</Button>
                <Button onClick={() => setShowModal(false)}>Lukk</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
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
