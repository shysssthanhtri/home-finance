import { type TUserEntity } from "@/domain/entities/user.entity";
import { type Transaction } from "@/server/db";

const getUserByEmail = async (
  email: TUserEntity["email"],
  transaction: Transaction,
): Promise<TUserEntity> => {
  const user = await transaction.user.findFirstOrThrow({
    where: {
      email,
    },
  });
  return user;
};

const getNamesByIds = async (
  ids: TUserEntity["id"][],
  transaction: Transaction,
) => {
  const users = await transaction.user.findMany({
    select: { name: true, id: true },
    where: {
      id: {
        in: ids,
      },
    },
  });
  return users;
};

export const userService = {
  getUserByEmail,
  getNamesByIds,
};
