import { TeamMemberRole } from "@prisma/client";
import { z } from "zod";

import { OkResponseDto } from "@/domain/dtos/response.dto";
import {
  CreateRequestJoinTeamDto,
  RequestJoinTeamInfoDto,
  TeamIdDto,
} from "@/domain/dtos/team";
import { AcceptRequestJoinTeamDto } from "@/domain/dtos/team/accept-request-join-team.dto";
import { RejectRequestJoinTeamDto } from "@/domain/dtos/team/reject-request-join-team.dto";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { requestJoinTeamService } from "@/server/services/request-join-team.service";
import { teamService } from "@/server/services/team.service";

export const requestJoinTeamRouter = createTRPCRouter({
  getRequests: protectedProcedure
    .input(TeamIdDto)
    .output(z.array(RequestJoinTeamInfoDto))
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
        const requests = await requestJoinTeamService.getRequestsJoinTeamInfo(
          { teamId },
          tx,
        );
        return requests;
      });
    }),

  createRequestJoin: protectedProcedure
    .input(CreateRequestJoinTeamDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        if (
          (
            await requestJoinTeamService.getRequestsJoinTeamByTeamIdUserId(
              input.teamId,
              userId,
              tx,
            )
          ).length
        ) {
          throw new Error("User has already requested");
        }
        if (await teamService.isUserInTeam(userId, input.teamId, tx)) {
          throw new Error("User has already been in team");
        }
        await requestJoinTeamService.create(userId, input, tx);
        return {};
      });
    }),

  acceptRequest: protectedProcedure
    .input(AcceptRequestJoinTeamDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          input.teamId,
          TeamMemberRole.ADMIN,
          tx,
        );
        await requestJoinTeamService.acceptRequestJoinTeam(
          input.teamId,
          input.userId,
          tx,
        );
        return {};
      });
    }),

  rejectRequest: protectedProcedure
    .input(RejectRequestJoinTeamDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          input.teamId,
          TeamMemberRole.ADMIN,
          tx,
        );
        await requestJoinTeamService.rejectRequestJoinTeam(
          input.teamId,
          input.userId,
          tx,
        );
        return {};
      });
    }),

  getMyRequests: protectedProcedure
    .output(z.array(RequestJoinTeamInfoDto))
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        const requests = await requestJoinTeamService.getRequestsJoinTeamInfo(
          { userId },
          tx,
        );
        return requests;
      });
    }),

  rejectMyRequest: protectedProcedure
    .input(RejectRequestJoinTeamDto.pick({ teamId: true }))
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        await requestJoinTeamService.rejectRequestJoinTeam(
          input.teamId,
          userId,
          tx,
        );
        return {};
      });
    }),
});
