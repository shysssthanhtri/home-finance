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

export const inviteJoinTeamService = {
  getInvitesJoinTeam,
  acceptInviteJoinTeam,
  rejectInviteJoinTeam,
  getInvitesJoinTeamByTeamIdUserId,
  createInvitesJoinTeam,
};
