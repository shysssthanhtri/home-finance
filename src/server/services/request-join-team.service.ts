import { type TCreateRequestJoinTeamDto } from "@/domain/dtos/team";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { type Transaction } from "@/server/db";

const getRequestsJoinTeam = async (
  teamId: TTeamEntity["id"],
  transaction: Transaction,
) => {
  return transaction.requestJoinTeam.findMany({
    where: {
      teamId,
    },
  });
};

const acceptRequestJoinTeam = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  const request = await transaction.requestJoinTeam.findFirstOrThrow({
    where: {
      teamId,
      userId,
    },
  });
  const relationship = await transaction.teamMember.create({
    data: {
      userId,
      teamId,
      role: request.role,
    },
  });
  await transaction.requestJoinTeam.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
  return relationship;
};

const rejectRequestJoinTeam = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  return transaction.requestJoinTeam.delete({
    where: {
      teamId_userId: {
        teamId,
        userId,
      },
    },
  });
};

const getRequestsJoinTeamByTeamIdUserId = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  return transaction.requestJoinTeam.findMany({
    where: {
      teamId,
      userId,
    },
  });
};

const create = async (
  userId: TUserEntity["id"],
  dto: TCreateRequestJoinTeamDto,
  transaction: Transaction,
) => {
  return transaction.requestJoinTeam.create({
    data: {
      teamId: dto.teamId,
      role: dto.role,
      userId,
    },
  });
};

export const requestJoinTeamService = {
  getRequestsJoinTeam,
  acceptRequestJoinTeam,
  rejectRequestJoinTeam,
  create,
  getRequestsJoinTeamByTeamIdUserId,
};
