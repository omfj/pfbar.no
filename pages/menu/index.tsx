import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase-config";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { toast } from "react-hot-toast";
import useAuth from "lib/auth-context";

const MenuPage = () => {
  const [value, loading, error] = useCollection(collection(db, "products"));
  const { user } = useAuth();

  const handleOrder = async (product_id: string) => {
    if (!user) {
      toast("Du må være logget inn for å bestille");
      return;
    }

    const productRef = doc(db, "products", product_id);
    const userRef = doc(db, "users", user.uid);

    try {
      await addDoc(collection(db, "orders"), {
        productId: productRef,
        userId: userRef,
        createdAt: Timestamp.fromDate(new Date()),
      });

      toast("Bestilling sendt");
    } catch (error) {
      console.log(error);
      toast("Kunne ikke sende bestilling");
    }
  };

  return (
    <div>
      {error && (
        <p className="text-center text-3xl">{"Det har skjedd en feil :("}</p>
      )}
      {loading && <p className="text-center text-3xl">Laster inn...</p>}
      {value && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto px-3">
          {value.docs.map((doc) => {
            const inStock = doc.data().inStock;

            return (
              <div
                className="flex flex-col relative gap-2 overflow-hidden bg-pink-400 text-white rounded p-2"
                key={doc.id}
              >
                <p
                  className={`${
                    inStock ? "text-green-400" : "text-red-400"
                  } bg-white absolute right-2 top-2 w-fit p-1`}
                >
                  {inStock ? "På lager" : "Ikke på lager"}
                </p>

                <h1 className="font-bold text-2xl">{doc.data().name}</h1>
                <p>{doc.data().description}</p>
                <button
                  className={`rounded border p-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={() => handleOrder(doc.id)}
                  disabled={!user || !inStock}
                >
                  Bestill
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
