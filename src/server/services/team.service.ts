import { TeamMemberRole } from "@prisma/client";

import { type TRemoveMemberDto } from "@/domain/dtos/team/remove-member.dto";
import { type TUpdateMemberRoleDto } from "@/domain/dtos/team/update-member-role.dto";
import {
  type TCreateTeamDto,
  type TTeamDetailDto,
  type TTeamEntity,
  type TUpdateTeamDto,
} from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { Forbidden } from "@/domain/errors/forbidden.error";
import { type Transaction } from "@/server/db";

const createPersonalTeam = async (
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  const team = await transaction.team.create({
    data: {
      name: "Personal",
      belongToUserId: userId,
      members: {
        create: {
          userId: userId,
          role: TeamMemberRole.ADMIN,
        },
      },
    },
  });
  return team;
};

const createTeam = async (
  userId: TUserEntity["id"],
  dto: TCreateTeamDto,
  transaction: Transaction,
) => {
  const team = await transaction.team.create({
    data: {
      name: dto.name,
      members: {
        create: {
          userId: userId,
          role: TeamMemberRole.ADMIN,
        },
      },
    },
  });
  return team;
};

const updateMemberRole = async (
  dto: TUpdateMemberRoleDto,
  transaction: Transaction,
) => {
  const team = await transaction.team.findFirstOrThrow({
    where: { id: dto.teamId },
  });
  if (team.belongToUserId === dto.userId) {
    throw new Error("Cannot change role of personal's team owner");
  }

  return transaction.teamMember.update({
    where: {
      teamId_userId: {
        teamId: dto.teamId,
        userId: dto.userId,
      },
    },
    data: {
      role: dto.role,
    },
  });
};

const removeMember = async (
  dto: TRemoveMemberDto,
  transaction: Transaction,
) => {
  const team = await transaction.team.findFirstOrThrow({
    where: { id: dto.teamId },
  });
  if (team.belongToUserId === dto.userId) {
    throw new Error("Cannot remove personal's team owner");
  }

  return transaction.teamMember.delete({
    where: {
      teamId_userId: {
        teamId: dto.teamId,
        userId: dto.userId,
      },
    },
  });
};

const isUserHasPersonalTeam = async (
  userId: TUserEntity["id"],
  transaction: Transaction,
): Promise<boolean> => {
  const team = await transaction.team.findFirst({
    select: { id: true },
    where: { belongToUserId: userId },
  });
  return !!team;
};

const isUserCanActionOnTeam = async (
  role: TeamMemberRole,
  requiredRole: TeamMemberRole,
): Promise<boolean> => {
  return (
    (teamRolePriorityDict[role] ?? 0) >=
    (teamRolePriorityDict[requiredRole] ?? 999)
  );
};

const getPersonalTeam = async (
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  if (!(await isUserHasPersonalTeam(userId, transaction))) {
    await createPersonalTeam(userId, transaction);
  }
  const team = await transaction.team.findFirstOrThrow({
    where: { belongToUserId: userId },
  });
  return team;
};

const setActiveTeam = async (
  teamId: TTeamEntity["id"],
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  if (
    await transaction.activeTeam.findFirst({
      where: { userId },
    })
  ) {
    await transaction.activeTeam.delete({
      where: {
        userId,
      },
    });
  }
  return transaction.activeTeam.create({
    data: {
      teamId,
      userId,
    },
  });
};

const getActiveTeam = async (
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  const _getActiveTeam = async () =>
    transaction.activeTeam.findFirst({
      where: {
        userId,
      },
    });

  let activeTeam = await _getActiveTeam();
  if (!activeTeam) {
    const personalTeam = await getPersonalTeam(userId, transaction);
    await setActiveTeam(personalTeam.id, userId, transaction);
    activeTeam = await _getActiveTeam();
  }

  if (!activeTeam) {
    throw new Error(`Cannot found active team for user: ${userId}`);
  }

  return activeTeam;
};

const getTeamInfo = async (
  teamId: TTeamEntity["id"],
  transaction: Transaction,
): Promise<TTeamDetailDto> => {
  const team = await transaction.team.findFirstOrThrow({
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
    image: m.user.image,
  }));

  const formattedTeam: TTeamDetailDto = {
    ...team,
    members,
  };
  return formattedTeam;
};

const updateTeam = async (
  userId: TUserEntity["id"],
  dto: TUpdateTeamDto,
  transaction: Transaction,
) => {
  const team = await transaction.team.update({
    where: { id: dto.id },
    data: {
      name: dto.name,
    },
  });
  return team;
};

const checkUserCan = async (
  userId: TUserEntity["id"],
  teamId: TTeamEntity["id"],
  role: TeamMemberRole,
  transaction: Transaction,
) => {
  const teamMember = await transaction.teamMember.findFirstOrThrow({
    where: {
      userId,
      teamId,
    },
  });

  if (!(await isUserCanActionOnTeam(teamMember.role, role))) {
    throw new Forbidden();
  }
};

const getTeams = async (
  userId: TUserEntity["id"],
  transaction: Transaction,
) => {
  return transaction.team.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  });
};

const getTeamsByIds = async (
  ids: TTeamEntity["id"][],
  transaction: Transaction,
) => {
  return transaction.team.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

const isUserInTeam = async (
  userId: TUserEntity["id"],
  teamId: TTeamEntity["id"],
  transaction: Transaction,
) => {
  const member = await transaction.teamMember.findFirst({
    where: {
      teamId,
      userId,
    },
  });
  return !!member;
};

export const teamService = {
  //  CREATE
  createPersonalTeam,
  createTeam,
  //  READ
  getPersonalTeam,
  isUserHasPersonalTeam,
  getTeamInfo,
  checkUserCan,
  getActiveTeam,
  getTeams,
  getTeamsByIds,
  isUserInTeam,
  //  UPDATE
  updateTeam,
  updateMemberRole,
  setActiveTeam,
  //  DELETE
  removeMember,
};

const teamRolePriority = [
  TeamMemberRole.ADMIN,
  TeamMemberRole.MEMBER,
  TeamMemberRole.VIEWER,
];
const teamRolePriorityDict = teamRolePriority.reduce<Record<string, number>>(
  (prev, curr, index) => {
    prev[curr] = teamRolePriority.length - index;
    return prev;
  },
  {},
);
