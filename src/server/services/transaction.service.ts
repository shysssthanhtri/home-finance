import { type TCreateTransactionDto } from "@/domain/dtos/transaction/create-transaction.dto";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { type Transaction } from "@/server/db";

const createTransaction = async (
  userId: TUserEntity["id"],
  dto: TCreateTransactionDto,
  transaction: Transaction,
) => {
  return transaction.transaction.create({
    data: {
      ...dto,
      createdById: userId,
    },
  });
};

export const transactionService = {
  createTransaction,
};
