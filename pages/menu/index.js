import Product from "../../components/Product";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const MenuPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let { data, error, status } = await supabase
        .from("products")
        .select("id, name, description");

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setProducts(data);
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-5">Meny</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 px-5 gap-2">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
