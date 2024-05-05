import { type PrismaClient } from "@prisma/client";
import { type ITXClientDenyList } from "@prisma/client/runtime/library";

import { type TUserEntity } from "@/domain/entities/user.entity";

const getUserByEmail = async (
  email: TUserEntity["email"],
  transaction: Omit<PrismaClient, ITXClientDenyList>,
): Promise<TUserEntity> => {
  const user = await transaction.user.findFirstOrThrow({
    where: {
      email,
    },
  });
  return user;
};

export const userService = {
  getUserByEmail,
};
