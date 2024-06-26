import {
  type TCreateRequestJoinTeamDto,
  type TRequestJoinTeamInfoDto,
} from "@/domain/dtos/team";
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

const getRequestsJoinTeamByUserId = async (
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  return transaction.requestJoinTeam.findMany({
    where: {
      userId,
    },
  });
};

type GetRequestsJoinTeamInfoOptions = {
  userId?: TUserEntity["id"];
  teamId?: TTeamEntity["id"];
};
const getRequestsJoinTeamInfo = async (
  options: GetRequestsJoinTeamInfoOptions,
  tx: Transaction,
): Promise<TRequestJoinTeamInfoDto[]> => {
  const requests = await tx.requestJoinTeam.findMany({
    where: {
      teamId: options.teamId,
      userId: options.userId,
    },
    include: {
      team: { select: { name: true } },
      user: { select: { name: true, email: true, image: true } },
    },
  });

  return requests;
};

export const requestJoinTeamService = {
  //  CREATE
  create,
  //  READ
  getRequestsJoinTeam,
  getRequestsJoinTeamByTeamIdUserId,
  getRequestsJoinTeamByUserId,
  getRequestsJoinTeamInfo,
  //  UPDATE
  acceptRequestJoinTeam,
  //  DELETE
  rejectRequestJoinTeam,
};
