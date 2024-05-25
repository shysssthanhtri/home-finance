import { type TeamMemberRole } from "@prisma/client";

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
    include: {
      team: {
        select: { name: true },
      },
      user: {
        select: { name: true, email: true, image: true },
      },
    },
  });

  return invites;
};

export const inviteJoinTeamService = {
  getInvitesJoinTeam,
  acceptInviteJoinTeam,
  rejectInviteJoinTeam,
  getInvitesJoinTeamByTeamIdUserId,
  createInvitesJoinTeam,
  getInvitesJoinTeamInfo,
};
