import Orders from "@/components/Orders";
import useAuth from "lib/auth-context";

const AdminPage = () => {
  const { user } = useAuth();

  if (!user?.roles.includes("admin")) {
    return <div>Du har ikke tilgang til denne siden</div>;
  }

  return (
    <div>
      <p>Dashboard</p>

      <div>
        <Orders />
      </div>
    </div>
  );
};

export default AdminPage;
