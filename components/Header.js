import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

const Header = () => {
  const user = useUser();

  return (
    <header className="flex px-3 py-5 bg-pink-200 border-b border-b-black mb-5">
      <p className="text-2xl font-bold">Pink Flamingo</p>
      <div className="flex-grow" />
      <nav>
        <ul className="flex gap-3 text-lg">
          <li>
            <Link href="/">Hjem</Link>
          </li>
          <li>
            <Link href="/menu">Meny</Link>
          </li>
          <li>
            <Link href="/account">{user ? "Min bruker" : "Logg inn"}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
