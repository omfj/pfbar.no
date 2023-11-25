"use server";

import { getSession } from "@/auth/utils";
import { db } from "@/db/drizzle";
import { carts } from "@/db/schemas";
import { eq } from "drizzle-orm";

type CartAction = "add" | "remove" | "set";

export async function mutateCart(action: CartAction, productId: string) {
  try {
    const session = await getSession();

    if (!session) {
      return {
        success: false,
        message: "Du må være logget inn for å legge til noe i handlekurven.",
      };
    }

    const product = await db.query.products.findFirst({
      where: (product) => eq(product.id, productId),
    });

    if (!product) {
      return {
        success: false,
        message: "Produktet finnes ikke.",
      };
    }
    const cart = await db.query.carts.findFirst({
      where: (cart) => eq(cart.userId, session.user.id),
    });

    let updatedContent = { ...cart?.content };

    if (action === "add") {
      if (updatedContent[productId]) {
        updatedContent[productId] += 1;
      } else {
        updatedContent[productId] = 1;
      }
    } else if (action === "remove") {
      if (updatedContent[productId]) {
        updatedContent[productId] -= 1;

        if (updatedContent[productId] < 1) {
          delete updatedContent[productId];
        }
      } else {
        return {
          success: false,
          message: "Produktet finnes ikke i handlekurven.",
        };
      }
    }

    if (cart) {
      await db.update(carts).set({
        content: updatedContent,
      }).where(eq(carts.userId, session.user.id));
    } else {
      await db.insert(carts).values({
        userId: session.user.id,
        content: updatedContent,
      });
    }

    return {
      success: true,
      message: "Produktet ble lagt til i handlekurven.",
    };
  } catch {
    return {
      success: false,
      message: "Noe gikk galt.",
    };
  }
}
