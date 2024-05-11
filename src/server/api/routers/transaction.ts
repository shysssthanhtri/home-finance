import { TeamMemberRole } from "@prisma/client";
import { z } from "zod";

import { TeamIdDto } from "@/domain/dtos/team";
import { AmountDto } from "@/domain/dtos/transaction/amount.dto";
import { CreateTransactionDto } from "@/domain/dtos/transaction/create-transaction.dto";
import { GetMonthlyAmountDto } from "@/domain/dtos/transaction/get-monthy-amount.dto";
import { TransactionEntity } from "@/domain/entities/transaction.entity";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { teamService } from "@/server/services/team.service";
import { transactionService } from "@/server/services/transaction.service";

export const transactionRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateTransactionDto)
    .output(TransactionEntity)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.teamId;
      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          teamId,
          TeamMemberRole.MEMBER,
          tx,
        );

        const transaction = await transactionService.createTransaction(
          userId,
          input,
          tx,
        );
        return transaction;
      });
    }),

  getTodayTransactions: protectedProcedure
    .input(TeamIdDto)
    .output(z.array(TransactionEntity))
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.id;
      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          teamId,
          TeamMemberRole.VIEWER,
          tx,
        );

        const transactions = await transactionService.getTodayTransactions(
          teamId,
          tx,
        );
        return transactions;
      });
    }),

  getMonthlyAmount: protectedProcedure
    .input(GetMonthlyAmountDto)
    .output(AmountDto)
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const teamId = input.teamId;
      return ctx.db.$transaction(async (tx) => {
        await teamService.checkUserCan(
          userId,
          teamId,
          TeamMemberRole.VIEWER,
          tx,
        );
        const amount = await transactionService.getMonthlyAmount(input, tx);
        return {
          amount,
        };
      });
    }),
});
