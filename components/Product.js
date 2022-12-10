import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

const Product = ({ product }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [ordered, setOrdered] = useState(false);

  const handleOrder = async () => {
    try {
      const { error } = await supabase.from("orders").insert({
        product_id: product.id,
        user_id: user.id,
        created_at: new Date().toISOString(),
      });

      setOrdered(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border border-black bg-pink-200 py-3 px-2">
      <h1 className="text-2xl font-bold border-b border-b-black">
        {product.name}
      </h1>
      <p className="py-2">{product.description}</p>
      {!ordered && (
        <button
          className="bg-white border border-black px-2 py-1"
          onClick={() => handleOrder()}
        >
          Bestill nå
        </button>
      )}
      {ordered && (
        <button disabled className="bg-green-300 border border-black px-2 py-1">
          Bestilt!
        </button>
      )}
    </div>
  );
};

export default Product;
