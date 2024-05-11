import { postRouter } from "@/server/api/routers/post";
import { requestJoinTeamRouter } from "@/server/api/routers/request-join-team";
import { teamRouter } from "@/server/api/routers/team";
import { transactionRouter } from "@/server/api/routers/transaction";
import { userRouter } from "@/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  team: teamRouter,
  requestJoinTeam: requestJoinTeamRouter,
  transaction: transactionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
