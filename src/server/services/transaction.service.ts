import { endOfDay, endOfMonth, startOfDay, startOfMonth } from "date-fns";

import { type TCreateTransactionDto } from "@/domain/dtos/transaction/create-transaction.dto";
import { type TGetMonthlyAmountDto } from "@/domain/dtos/transaction/get-monthy-amount.dto";
import { type TTeamEntity } from "@/domain/entities/team.entity";
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

const getTodayTransactions = async (
  teamId: TTeamEntity["id"],
  tx: Transaction,
) => {
  const now = new Date();
  const start = startOfDay(now);
  const end = endOfDay(now);
  const transactions = await tx.transaction.findMany({
    where: {
      teamId,
      time: {
        gte: start,
        lte: end,
      },
    },
    orderBy: {
      time: "desc",
    },
  });
  return transactions;
};

const getMonthlyAmount = async (dto: TGetMonthlyAmountDto, tx: Transaction) => {
  const now = new Date(dto.time);
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const result = await tx.transaction.aggregate({
    where: {
      teamId: dto.teamId,
      type: dto.type,
      time: {
        gte: start,
        lte: end,
      },
    },
    _sum: {
      amount: true,
    },
  });
  return result._sum.amount ?? 0;
};

export const transactionService = {
  createTransaction,
  getTodayTransactions,
  getMonthlyAmount,
};
