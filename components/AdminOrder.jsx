import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Box from "./Box";
import Button from "./Button";

const AdminOrder = ({ order }) => {
  const supabase = useSupabaseClient();

  const [deleted, setDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", order.id);

      if (error) throw error;

      setDeleted(true);
      toast.success("Ordren ble slettet");
    } catch (error) {
      console.log(error);
      toast("Kunne ikke slette ordren");
    }
  };

  if (deleted) return null;

  return (
    <li>
      <Box variant="slate" modifier="outline">
        <div>
          <p>Ordrenummer: {order.id}</p>
          <p>Produkt: {order.product}</p>
          <p>Kjøper: {order.name}</p>
          <p>Bestilt: {order.createdAt}</p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="primary">Oppdater</Button> */}
          <Button onClick={() => handleDelete()} variant="danger">
            Fjern
          </Button>
        </div>
      </Box>
    </li>
  );
};

export default AdminOrder;
