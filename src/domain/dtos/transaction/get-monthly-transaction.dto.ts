import { type z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const GetMonthlyTransactionDto = TransactionEntity.pick({
  teamId: true,
  time: true,
});
export type TGetMonthlyTransactionDto = z.infer<
  typeof GetMonthlyTransactionDto
>;
