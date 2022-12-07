import Button from "@/components/common/Button";
import useAuth from "lib/auth-context";

const Home = () => {
  const { user, loading, signIn } = useAuth();

  if (loading) {
    return <div className="text-center">Laster inn...</div>;
  }

  return (
    <>
      <div className="px-2 max-w-[600px] mx-auto">
        {!user && (
          <div className="text-center">
            <h1 className="text-4xl font-bold">
              Velkommen til <br /> Pink Flamingo!
            </h1>
            <p>Stedet å være når du vil ha en god drink.</p>
            <Button onClick={() => signIn()} variant="primary">
              Logg inn med Google
            </Button>
          </div>
        )}
        {user && (
          <>
            <p>
              Velkommen tilbake <b>{user.email}</b>!
            </p>
            <p>Dine roller: [{user.roles.join("") ?? "Ingen"}]</p>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
