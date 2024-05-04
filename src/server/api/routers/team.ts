import { TeamMemberRole } from "@prisma/client";

import {
  TeamDetailDto,
  TeamEntity,
  type TTeamDetailDto,
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

        const team = await tx.team.findFirstOrThrow({
          where: { id: teamId },
          include: {
            members: {
              include: {
                user: true,
              },
            },
            belongToUser: true,
          },
        });

        const members: TTeamDetailDto["members"] = team.members.map((m) => ({
          id: m.userId,
          name: m.user.name,
          email: m.user.email,
          role: m.role,
        }));

        const formattedTeam: TTeamDetailDto = {
          ...team,
          members,
        };
        return formattedTeam;
      });
    }),
});
