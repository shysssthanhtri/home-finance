import { type PrismaClient, TeamMemberRole } from "@prisma/client";
import { type ITXClientDenyList } from "@prisma/client/runtime/library";

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

export const teamService = {
  createPersonalTeam,
  isUserHasPersonalTeam,
};
