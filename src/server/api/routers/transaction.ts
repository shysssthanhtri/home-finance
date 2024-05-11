import { TeamMemberRole } from "@prisma/client";

import { CreateTransactionDto } from "@/domain/dtos/transaction/create-transaction.dto";
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
});
