import { UpdateUserDto } from "@/domain/entities/user.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(UpdateUserDto)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirstOrThrow({
        where: {
          id: ctx.session.user.id,
        },
      });

      user.name = input.name.trim();
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: user,
      });
    }),
});
