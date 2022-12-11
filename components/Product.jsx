import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import Box from "./Box";
import Button from "./Button";

const Product = ({ product }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const handleOrder = async () => {
    if (!user) {
      toast("Du må være logget inn for å bestille.");
      return;
    }

    try {
      const { error } = await supabase.from("orders").insert({
        product_id: product.id,
        user_id: user.id,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;

      toast("Bestilling sendt!");
    } catch {
      toast("Noe gikk galt, prøv igjen senere.");
    }
  };

  return (
    <Box variant="pink" modifier="outline">
      <div>
        <h1 className="text-2xl font-bold border-b border-b-black">
          {product.name}
        </h1>
        <p className="py-2">{product.description}</p>
      </div>
      <Button variant="primary" disabled={!user} onClick={() => handleOrder()}>
        Bestill nå
      </Button>
    </Box>
  );
};

export default Product;
