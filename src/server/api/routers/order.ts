import { z } from "zod";

import { protectedProcedure, createTRPCRouter } from "../trpc";

export const orderRouter = createTRPCRouter({
  makeOrder: protectedProcedure
    .input(
      z.object({
        products: z.array(
          z.object({
            productId: z.string(),
            quantity: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.create({
        data: {
          userId: ctx.session.user.id,
          items: {
            create: input.products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
            })),
          },
        },
      });

      return order;
    }),
});
