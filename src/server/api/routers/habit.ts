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
    .input(z.object({name: z.string(), habitType: z.string(), habitColor: z.string().optional()}))
    .mutation(async({input, ctx}) => {
      const habit = await ctx.prisma.habit.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          type: input.habitType,
          color: input.habitColor,
        }
      })
      return habit;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.habit.delete({
        where: {
        id: input.id,
      }
    })
    }),
  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string(), habitColor: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.habit.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          color: input.habitColor
        }
    })
  })
});
