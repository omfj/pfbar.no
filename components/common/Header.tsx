import useAuth from "lib/auth-context";
import Link from "next/link";

const Header = () => {
  const { user, signIn, signOut } = useAuth();

  return (
    <header className="flex p-5 items-center bg-pink-400 text-white mb-5 shadow-md">
      <h1 className="font-bold text-2xl">Pink Flamingo</h1>
      <div className="flex-grow" />
      <nav className="font-semibold">
        <ul className="flex gap-5">
          <li className="hover:underline">
            <Link href="/">Hjem</Link>
          </li>
          <li className="hover:underline">
            <Link href="/menu">Meny</Link>
          </li>
          {user?.roles.includes("admin") && (
            <li className="hover:underline">
              <Link href="/admin">Admin</Link>
            </li>
          )}
          <li className="hover:underline">
            {user ? (
              <button className="hover:underline" onClick={() => signOut()}>
                Logg ut
              </button>
            ) : (
              <button className="hover:underline" onClick={() => signIn()}>
                Logg inn
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
