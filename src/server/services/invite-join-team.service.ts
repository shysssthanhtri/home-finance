import { type TeamMemberRole } from "@prisma/client";

import { type TInviteJoinTeamInfoDto } from "@/domain/dtos/team/invite-join-team-info.dto";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { type Transaction } from "@/server/db";

const getInvitesJoinTeam = async (
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  return transaction.inviteJoinTeam.findMany({
    where: {
      userId,
    },
  });
};

const acceptInviteJoinTeam = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  const invite = await transaction.inviteJoinTeam.findFirstOrThrow({
    where: {
      teamId,
      userId,
    },
  });
  const relationship = await transaction.teamMember.create({
    data: {
      userId,
      teamId,
      role: invite.role,
    },
  });
  await transaction.inviteJoinTeam.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
  return relationship;
};

const rejectInviteJoinTeam = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  return transaction.inviteJoinTeam.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
};

const getInvitesJoinTeamByTeamIdUserId = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  return transaction.inviteJoinTeam.findMany({
    where: {
      teamId,
      userId,
    },
  });
};

const createInvitesJoinTeam = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  role: TeamMemberRole,
  transaction: Transaction,
) => {
  return transaction.inviteJoinTeam.create({
    data: {
      userId,
      teamId,
      role,
    },
  });
};

type GetInvitesJoinTeamInfoOptions = {
  userId?: TUserEntity["id"];
  teamId?: TTeamEntity["id"];
};
const getInvitesJoinTeamInfo = async (
  options: GetInvitesJoinTeamInfoOptions,
  tx: Transaction,
) => {
  const invites = await tx.inviteJoinTeam.findMany({
    where: {
      teamId: options.teamId,
      userId: options.userId,
    },
  });

  const [users, teams] = await Promise.all([
    tx.user.findMany({
      where: { id: { in: invites.map((r) => r.userId) } },
      select: { id: true, name: true, email: true },
    }),
    tx.team.findMany({
      where: { id: { in: invites.map((r) => r.teamId) } },
      select: { id: true, name: true },
    }),
  ]);

  return invites.map<TInviteJoinTeamInfoDto>((r) => ({
    ...r,
    userName: users.find((u) => u.id === r.userId)?.name,
    userEmail: users.find((u) => u.id === r.userId)?.email,
    teamName: teams.find((u) => u.id === r.teamId)?.name,
  }));
};

export const inviteJoinTeamService = {
  getInvitesJoinTeam,
  acceptInviteJoinTeam,
  rejectInviteJoinTeam,
  getInvitesJoinTeamByTeamIdUserId,
  createInvitesJoinTeam,
  getInvitesJoinTeamInfo,
};
