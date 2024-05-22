import { TeamMemberRole } from "@prisma/client";

import { OkResponseDto } from "@/domain/dtos/response.dto";
import { RemoveMemberDto } from "@/domain/dtos/team/remove-member.dto";
import { UpdateMemberRoleDto } from "@/domain/dtos/team/update-member-role.dto";
import {
  CreateTeamDto,
  SetActiveTeamDto,
  TeamDetailDto,
  TeamEntity,
  UpdateTeamDto,
} from "@/domain/entities/team.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { teamService } from "@/server/services/team.service";

export const teamRouter = createTRPCRouter({
  getTeams: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.$transaction(async (tx) => {
      if (!(await teamService.isUserHasPersonalTeam(userId, tx))) {
        await teamService.createPersonalTeam(userId, tx);
      }
      return teamService.getTeams(userId, tx);
    });
  }),

  getTeam: protectedProcedure
    .input(TeamEntity.pick({ id: true }))
    .output(TeamDetailDto)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.id;

      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          teamId,
          TeamMemberRole.VIEWER,
          tx,
        );

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

  updateTeam: protectedProcedure
    .input(UpdateTeamDto)
    .output(TeamDetailDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.id;

      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          teamId,
          TeamMemberRole.ADMIN,
          tx,
        );

        const team = await teamService.updateTeam(userId, input, tx);
        return teamService.getTeamInfo(team.id, tx);
      });
    }),

  updateMemberRole: protectedProcedure
    .input(UpdateMemberRoleDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.teamId;

      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          teamId,
          TeamMemberRole.ADMIN,
          tx,
        );

        await teamService.updateMemberRole(input, tx);
        return {};
      });
    }),

  removeMember: protectedProcedure
    .input(RemoveMemberDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.teamId;

      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          teamId,
          TeamMemberRole.ADMIN,
          tx,
        );
        await teamService.removeMember(input, tx);
        return {};
      });
    }),

  getActiveTeam: protectedProcedure
    .output(TeamDetailDto)
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.db.$transaction(async (tx) => {
        const activeTeam = await teamService.getActiveTeam(userId, tx);
        await teamService.checkUserCan(
          userId,
          activeTeam.teamId,
          TeamMemberRole.VIEWER,
          tx,
        );

        return teamService.getTeamInfo(activeTeam.teamId, tx);
      });
    }),

  setActiveTeam: protectedProcedure
    .input(SetActiveTeamDto)
    .output(TeamDetailDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      return ctx.db.$transaction(async (tx) => {
        await teamService.setActiveTeam(input.id, userId, tx);
        return teamService.getTeamInfo(input.id, tx);
      });
    }),

  getPersonalTeam: protectedProcedure
    .output(TeamDetailDto)
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      return ctx.db.$transaction(async (tx) => {
        const team = await teamService.getPersonalTeam(userId, tx);
        await teamService.checkUserCan(
          userId,
          team.id,
          TeamMemberRole.VIEWER,
          tx,
        );
        return teamService.getTeamInfo(team.id, tx);
      });
    }),
});
