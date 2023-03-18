import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  XMarkIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

import { useCartStore } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { type HeaderRoute, headerRoutes } from "@/lib/routes";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartHasItems, setCartHasItems] = useState<boolean>(false);

  const { data: session } = useSession();

  const { pathname } = useRouter();

  const products = useCartStore((state) => state.products);

  useEffect(() => {
    setCartHasItems(Object.keys(products ?? {}).length > 0);
  }, [products]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      <div className="border-b border-black">
        <header className="mx-auto flex w-full max-w-7xl items-center gap-4 px-3 md:px-5">
          <h1 className="flex-1 py-4 font-cardo text-3xl font-extrabold">
            <Link href="/">🦩 Pink Flamingo</Link>
          </h1>

          <nav className="hidden md:block">
            <ul className="flex gap-4">
              {headerRoutes.map((route: HeaderRoute) => {
                if (route.session === !session) {
                  return null;
                }

                if (route.admin && session?.user.role !== "ADMIN") {
                  return null;
                }

                return (
                  <li key={route.path}>
                    <Link className="hover:underline" href={route.path}>
                      {route.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative">
            <Link href="/handlekurv">
              <ShoppingCartIcon className="h-6 w-6" title="Handlekurv" />
            </Link>
            {cartHasItems && (
              <span className="absolute top-0 right-0 h-2 w-2 animate-pulse rounded-full bg-red-500" />
            )}
          </div>

          <div className="flex text-black md:hidden">
            {!isOpen && (
              <button onClick={() => setIsOpen(true)}>
                <Bars3Icon className="h-8 w-8" title="Åpne" />
              </button>
            )}
            {isOpen && (
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-8 w-8" title="Lukk" />
              </button>
            )}
          </div>

          <div className="hidden md:block">
            {session && (
              <Button onClick={() => void signOut({ callbackUrl: "/" })}>
                Logg ut
              </Button>
            )}

            {!session && (
              <Button onClick={() => void signIn()}>Logg inn</Button>
            )}
          </div>
        </header>
      </div>

      {isOpen && (
        <div className="absolute z-10 mx-auto w-full px-3 py-3">
          <div className="border border-black bg-white p-5">
            <ul className="mb-3 flex flex-col gap-1 font-semibold">
              {headerRoutes.map((route: HeaderRoute) => {
                if (route.session === !session) {
                  return null;
                }

                if (route.admin && session?.user.role !== "ADMIN") {
                  return null;
                }

                return (
                  <li key={route.path}>
                    <Link
                      className="flex items-center gap-3 p-3 text-xl hover:bg-black/5 focus:ring"
                      href={route.path}
                    >
                      {route.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-3">
              {session && (
                <Button onClick={() => void signOut({ callbackUrl: "/" })}>
                  Logg ut
                </Button>
              )}

              {!session && (
                <Button onClick={() => void signIn()}>Logg inn</Button>
              )}

              <Button onClick={() => setIsOpen(false)} fullWidth>
                Lukk
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
