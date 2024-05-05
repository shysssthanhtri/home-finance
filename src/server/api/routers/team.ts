import { TeamMemberRole } from "@prisma/client";

import {
  CreateTeamDto,
  TeamDetailDto,
  TeamEntity,
} from "@/domain/entities/team.entity";
import { Forbidden } from "@/domain/errors/forbidden.error";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { teamService } from "@/server/services/team.service";

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

  getTeam: protectedProcedure
    .input(TeamEntity.pick({ id: true }))
    .output(TeamDetailDto)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.id;

      return ctx.db.$transaction(async (tx) => {
        const teamMember = await tx.teamMember.findFirstOrThrow({
          where: {
            userId,
            teamId,
          },
        });

        if (
          !(await teamService.isUserCanActionOnTeam(
            teamMember.role,
            TeamMemberRole.VIEWER,
          ))
        ) {
          throw new Forbidden();
        }

        return teamService.getTeamInfo(teamId, tx);
      });
    }),

  createTeam: protectedProcedure
    .input(CreateTeamDto)
    .output(TeamDetailDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        const team = await teamService.createTeam(userId, input, tx);
        return teamService.getTeamInfo(team.id, tx);
      });
    }),
});
