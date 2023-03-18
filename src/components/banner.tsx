import { useSession } from "next-auth/react";

const Banner: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-black py-3 text-center font-bold text-white">
      <p className="text-sm">
        {session?.user?.name
          ? `Hei, ${session?.user?.name}!`
          : "Du burde logge inn"}
      </p>
    </div>
  );
};

export default Banner;
