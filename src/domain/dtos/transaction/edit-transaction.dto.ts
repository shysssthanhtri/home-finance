import { type z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const EditTransactionDto = TransactionEntity.pick({
  id: true,
  time: true,
  type: true,
  title: true,
  description: true,
  amount: true,
});
export type TEditTransactionDto = z.infer<typeof EditTransactionDto>;
