import { createTRPCRouter, publicProcedure } from "../trpc";

export const dashboardRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
});
