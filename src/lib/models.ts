import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm/sql";

export function getAllProducts() {
  return db.query.products.findMany();
}

export function getProductById(id: string) {
  return db.query.products.findFirst({
    where: (product) => eq(product.id, id),
  });
}

export function getCartByUserId(userId: string) {
  return db.query.carts.findFirst({
    where: (cart) => eq(cart.userId, userId),
  });
}
