import { type z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const CreateTransactionDto = TransactionEntity.pick({
  teamId: true,
  time: true,
  type: true,
  title: true,
  description: true,
});
export type TCreateTransactionDto = z.infer<typeof CreateTransactionDto>;
