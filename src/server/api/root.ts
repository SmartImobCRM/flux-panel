import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { migracaoRouter } from "./routers/migracao";
import { actionRouter } from "./routers/action";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  migracao: migracaoRouter,
  action: actionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
