import { type TransactionType } from "@prisma/client";
import {
  endOfDay,
  endOfMonth,
  getMonth,
  getYear,
  startOfDay,
  startOfMonth,
} from "date-fns";

import { type TCreateTransactionDto } from "@/domain/dtos/transaction/create-transaction.dto";
import { type TGetMonthlyAmountInDurationDto } from "@/domain/dtos/transaction/get-monthly-amount-in-duration.dto";
import { type TGetMonthlyAmountDto } from "@/domain/dtos/transaction/get-monthy-amount.dto";
import { type TMonthlyAmountDto } from "@/domain/dtos/transaction/monthly-amount.dto";
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

const getMonthlyAmountInDuration = async (
  dto: TGetMonthlyAmountInDurationDto,
  tx: Transaction,
) => {
  const start = startOfMonth(dto.start);
  const end = endOfMonth(dto.end);
  const result = await tx.$queryRaw<
    { month: Date; year: Date; type: TransactionType; amount: number }[]
  >`
    SELECT
      DATE_TRUNC('month', t."time") as month,
      DATE_TRUNC('year', t."time") as year,
      t."type" as type,
      SUM(t.amount) as amount
    FROM
      "Transaction" as t
    WHERE
      t."teamId" = ${dto.teamId}
      AND t."time" >= ${start}
      AND t."time" <= ${end}
    GROUP BY
      DATE_TRUNC('month', t."time"),
      DATE_TRUNC('year', t."time"),
      t."type"
    ORDER BY
      year ASC,
      month ASC
  `;
  return result.map<TMonthlyAmountDto>((i) => ({
    amount: i.amount,
    type: i.type,
    month: getMonth(i.month) + 1,
    year: getYear(i.year),
  }));
};

export const transactionService = {
  createTransaction,
  getTodayTransactions,
  getMonthlyAmount,
  getMonthlyAmountInDuration,
};
