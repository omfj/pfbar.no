import { createTRPCRouter } from "@/server/api/trpc";
import { dashboardRouter } from "@/server/api/routers/dashboard";
import { productRouter } from "@/server/api/routers/product";
import { profileRouter } from "@/server/api/routers/profile";
import { orderRouter } from "@/server/api/routers/order";

export const appRouter = createTRPCRouter({
  dashboard: dashboardRouter,
  product: productRouter,
  profile: profileRouter,
  order: orderRouter,
});

export type AppRouter = typeof appRouter;
