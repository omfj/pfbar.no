import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Box from "./Box";
import Button from "./Button";
import { toast } from "react-hot-toast";

const AdminProduct = ({ product }) => {
  const supabase = useSupabaseClient();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [deleted, setDeleted] = useState(false);

  const handleUpdate = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ name, description })
        .eq("id", product.id);

      if (error) throw error;

      toast.success("Produktet ble oppdatert");
    } catch (error) {
      console.log(error);
      toast.error("Kunne ikke oppdatere produktet");
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id);

      if (error) throw error;

      setDeleted(true);
      toast.success("Produktet ble slettet");
    } catch (error) {
      console.log(error);
      toast.error("Kunne ikke slette produktet");
    }
  };

  if (deleted) return null;

  return (
    <li>
      <Box variant="slate" modifier="outline">
        <div className="flex flex-col gap-1">
          <p>Produktnummer: {product.id}</p>
          <div className="flex gap-2">
            <label htmlFor="name">Navn: </label>
            <input
              className="px-1"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label htmlFor="description">Beskrivelse: </label>
            <input
              className="px-1"
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => handleUpdate()}>
            Oppdater
          </Button>
          <Button variant="danger" onClick={() => handleDelete()}>
            Fjern
          </Button>
        </div>
      </Box>
    </li>
  );
};

export default AdminProduct;
