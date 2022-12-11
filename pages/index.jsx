import Link from "next/link";
import Button from "../components/Button";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 text-center">
      <h1 className="font-bold text-5xl">
        Velkommen til <br /> Pink Flamingo!
      </h1>
      <div className="block">
        <Button variant="primary">
          <Link href="/menu">Bestill her</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
