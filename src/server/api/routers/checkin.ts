import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const checkinRouter = createTRPCRouter({  
  getAll: protectedProcedure
    .input(z.object({habitId: z.string()}))
    .query(({ ctx, input }) => {
    return ctx.prisma.checkin.findMany({
      where: {
        habitId: input.habitId,
      }
    })
   }),
  create: protectedProcedure
    .input(z.object({habitId: z.string()}))
    .mutation(async({ctx, input}) => {
      const checkin = await ctx.prisma.checkin.create({
        data: {
          habitId: input.habitId,
        }
      })
      return checkin;
  }),
  delete: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({ctx, input}) => {
      return ctx.prisma.checkin.delete({
        where: {
          id: input.id,
        }
      });
  }),
});
