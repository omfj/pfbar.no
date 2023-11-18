import { getSession } from "@/auth/utils";
import { db } from "@/db/drizzle";
import { baskets, orders } from "@/db/schemas";

type Item = {
  productId: string;
  quantity: number;
};

export async function makeOrder(items: Array<Item>) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Du er ikke logget inn",
      };
    }

    if (!items.length) {
      return {
        success: false,
        message: "Handlekurven er tom",
      };
    }

    await db.transaction(async (tx) => {
      const order = await tx
        .insert(orders)
        .values({
          userId: session.user.id,
        })
        .returning()
        .then((res) => res[0] ?? null);

      if (!order) {
        return tx.rollback();
      }

      const basketsToInsert = items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      }));

      await tx
        .insert(baskets)
        .values(basketsToInsert)
        .returning()
        .then((res) => res ?? null);
    });

    return {
      success: true,
      message: "Ordre lagt inn",
    };
  } catch {
    return {
      success: false,
      message: "Internal error",
    };
  }
}
