import { type PrismaClient, TeamMemberRole } from "@prisma/client";
import { type ITXClientDenyList } from "@prisma/client/runtime/library";

import {
  type TCreateTeamDto,
  type TRequestJoinTeamDto,
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";

const createPersonalTeam = async (
  userId: TUserEntity["id"],
  transaction: Omit<PrismaClient, ITXClientDenyList>,
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
  transaction: Omit<PrismaClient, ITXClientDenyList>,
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

const joinTeam = async (
  userId: TUserEntity["id"],
  dto: TRequestJoinTeamDto,
  transaction: Omit<PrismaClient, ITXClientDenyList>,
) => {
  return transaction.teamMember.create({
    data: {
      teamId: dto.id,
      role: dto.role,
      userId,
    },
  });
};

const isUserHasPersonalTeam = async (
  userId: TUserEntity["id"],
  transaction: Omit<PrismaClient, ITXClientDenyList>,
): Promise<boolean> => {
  const user = await transaction.user.findFirstOrThrow({
    where: { id: userId },
    select: {
      personalTeam: true,
    },
  });
  return !!user.personalTeam;
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

const getTeamInfo = async (
  teamId: TTeamEntity["id"],
  transaction: Omit<PrismaClient, ITXClientDenyList>,
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
  }));

  const formattedTeam: TTeamDetailDto = {
    ...team,
    members,
  };
  return formattedTeam;
};

export const teamService = {
  createPersonalTeam,
  isUserHasPersonalTeam,
  isUserCanActionOnTeam,
  createTeam,
  getTeamInfo,
  joinTeam,
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
