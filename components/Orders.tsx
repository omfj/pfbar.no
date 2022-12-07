import { db } from "firebase-config";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Orders = () => {
  const [value, loading, error] = useCollection(collection(db, "orders"));

  return (
    <>
      <h1>Bestillinger:</h1>
      {/* {error && <p>Det har skjedd en feil :(</p>} */}
      {error && <p>{error.message}</p>}
      {loading && <p>Laster inn...</p>}
      {value && (
        <div>
          {value.docs.map((doc) => {
            return (
              <div key={doc.id}>
                <p>{doc.data().userId}</p>
                <p>{doc.data().productId}</p>
                <p>{doc.data().createdAt}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Orders;
