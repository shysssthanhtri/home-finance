import { TeamMemberRole } from "@prisma/client";
import { z } from "zod";

import { OkResponseDto } from "@/domain/dtos/response.dto";
import {
  CreateRequestJoinTeamDto,
  RequestJoinTeamInfoDto,
  TeamIdDto,
  type TRequestJoinTeamInfoDto,
} from "@/domain/dtos/team";
import { AcceptRequestJoinTeamDto } from "@/domain/dtos/team/accept-request-join-team.dto";
import { RejectRequestJoinTeamDto } from "@/domain/dtos/team/reject-request-join-team.dto";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { requestJoinTeamService } from "@/server/services/request-join-team.service";
import { teamService } from "@/server/services/team.service";
import { userService } from "@/server/services/user.service";

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
        const requests = await requestJoinTeamService.getRequestsJoinTeam(
          teamId,
          tx,
        );

        const userNames = await userService.getNamesByIds(
          requests.map((r) => r.userId),
          tx,
        );
        const userNameDict = userNames.reduce<
          Record<TUserEntity["id"], TUserEntity["name"]>
        >((prev, curr) => {
          prev[curr.id] = curr.name;
          return prev;
        }, {});

        return requests.map<TRequestJoinTeamInfoDto>((r) => ({
          ...r,
          userName: userNameDict[r.userId],
        }));
      });
    }),

  createRequestJoin: protectedProcedure
    .input(CreateRequestJoinTeamDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        if (
          await requestJoinTeamService.getRequestsJoinTeamByTeamIdUserId(
            input.teamId,
            input.teamId,
            tx,
          )
        ) {
          throw new Error("User is already in team");
        }
        await teamService.joinTeam(userId, input, tx);
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
});
