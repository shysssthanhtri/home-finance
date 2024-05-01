import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { teamService } from "@/server/services/team";

export const teamRouter = createTRPCRouter({
  getTeams: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.$transaction(async (tx) => {
      if (!(await teamService.isUserHasPersonalTeam(userId, tx))) {
        await teamService.createPersonalTeam(userId, tx);
      }
      const teams = await tx.team.findMany({
        where: {
          members: {
            some: {
              userId: ctx.session.user.id,
            },
          },
        },
      });
      return teams;
    });
  }),
});
