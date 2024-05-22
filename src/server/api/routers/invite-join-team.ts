import { TeamMemberRole } from "@prisma/client";
import { z } from "zod";

import { OkResponseDto } from "@/domain/dtos/response.dto";
import { AcceptInviteJoinTeamDto } from "@/domain/dtos/team/accept-invite-join-team.dto";
import { CreateInviteJoinTeamDto } from "@/domain/dtos/team/create-invite-join-team.dto";
import {
  InviteJoinTeamInfoDto,
  type TInviteJoinTeamInfoDto,
} from "@/domain/dtos/team/invite-join-team-info.dto";
import { RejectInviteJoinTeamDto } from "@/domain/dtos/team/reject-invite-join-team.dto";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { inviteJoinTeamService } from "@/server/services/invite-join-team.service";
import { teamService } from "@/server/services/team.service";

export const inviteJoinTeamRouter = createTRPCRouter({
  getInvites: protectedProcedure
    .output(z.array(InviteJoinTeamInfoDto))
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        const invites = await inviteJoinTeamService.getInvitesJoinTeam(
          userId,
          tx,
        );

        const teams = await teamService.getTeamsByIds(
          invites.map((i) => i.teamId),
          tx,
        );
        const teamNameDict = teams.reduce<
          Record<TTeamEntity["id"], TTeamEntity["name"]>
        >((prev, curr) => {
          prev[curr.id] = curr.name;
          return prev;
        }, {});

        return invites.map<TInviteJoinTeamInfoDto>((r) => ({
          ...r,
          teamName: teamNameDict[r.teamId] ?? "",
        }));
      });
    }),

  createInviteJoin: protectedProcedure
    .input(CreateInviteJoinTeamDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          ctx.session.user.id,
          input.teamId,
          TeamMemberRole.ADMIN,
          tx,
        );
        const user = await tx.user.findFirstOrThrow({
          where: { email: input.email },
          select: { id: true },
        });
        if (
          (
            await inviteJoinTeamService.getInvitesJoinTeamByTeamIdUserId(
              input.teamId,
              user.id,
              tx,
            )
          ).length
        ) {
          throw new Error("User has already been invited");
        }
        if (await teamService.isUserInTeam(user.id, input.teamId, tx)) {
          throw new Error("User has already been in team");
        }
        await inviteJoinTeamService.createInvitesJoinTeam(
          input.teamId,
          user.id,
          input.role,
          tx,
        );
        return {};
      });
    }),

  acceptInvite: protectedProcedure
    .input(AcceptInviteJoinTeamDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        await inviteJoinTeamService.acceptInviteJoinTeam(
          input.teamId,
          userId,
          tx,
        );
        return {};
      });
    }),

  rejectInvite: protectedProcedure
    .input(RejectInviteJoinTeamDto)
    .output(OkResponseDto)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      return ctx.db.$transaction(async (tx) => {
        await inviteJoinTeamService.rejectInviteJoinTeam(
          input.teamId,
          userId,
          tx,
        );
        return {};
      });
    }),
});
