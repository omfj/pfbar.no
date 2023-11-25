import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getSession } from "@/auth/utils";
import { getCartByUserId } from "@/lib/models";

export async function CartButton() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const cart = await getCartByUserId(session.user.id);
  const itemsInCart = Object.keys(cart?.content ?? {}).length ?? 0;

  return (
    <Link href="/kurv">
      <div className="relative" suppressHydrationWarning>
        {itemsInCart > 0 && (
          <span className="absolute bg-white rounded-full h-4 w-4 flex items-center justify-center text-xs -top-3 -right-3">
            {itemsInCart}
          </span>
        )}
        <ShoppingCart />
      </div>
    </Link>
  );
}
