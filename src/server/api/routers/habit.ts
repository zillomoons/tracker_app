import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const habitRouter = createTRPCRouter({  
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.habit.findMany({
      where: {
        userId: ctx.session.user.id
      }
    })
   }),
  create: protectedProcedure
    .input(z.object({name: z.string()}))
    .mutation(async({input, ctx}) => {
      const habit = await ctx.prisma.habit.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id
        }
      })
      return habit;
    }),
  getHabitById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
    return ctx.prisma.habit.findUnique({
      where: {
        id: input.id
      }
    })
  })
});
