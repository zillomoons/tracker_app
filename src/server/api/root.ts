import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { habitRouter } from "~/server/api/routers/habit";
import { checkinRouter } from "~/server/api/routers/checkin";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  habit: habitRouter,
  checkin: checkinRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
