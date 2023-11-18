import { getSession } from "@/auth/utils";
import Link from "next/link";
import { NavLink } from "./nav-link";
import { SignOutNavButton } from "./sign-out-nav-button";

export async function SiteHeader() {
  const session = await getSession();

  return (
    <header className="flex justify-between items-center bg-primary px-8 rounded-b-3xl py-8 max-w-6xl mx-auto">
      <Link className="text-3xl font-bold" href="/">
        Pink Flamingo
      </Link>

      <nav>
        <ul className="flex items-center gap-4">
          <NavLink href="/meny">Meny</NavLink>
          {session && <NavLink href="/profil">Min profil</NavLink>}
          {session && <SignOutNavButton />}
          {!session && <NavLink href="/logg-inn">Logg inn</NavLink>}
        </ul>
      </nav>
    </header>
  );
}
