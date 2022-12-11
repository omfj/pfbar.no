import Product from "../../components/Product";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

const MenuPage = ({ products }) => {
  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-5">Meny</h1>
      {products.length === 0 && (
        <p className="text-center text-3xl">Ingen produkter å vise</p>
      )}
      <div className="max-w-xl md:max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 px-1 md:px-5 gap-5">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("products")
    .select("id, name, description");

  return {
    props: {
      initialSession: session,
      products: data,
    },
  };
};

export default MenuPage;
