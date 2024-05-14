import { type z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const RemoveTransactionDto = TransactionEntity.pick({
  id: true,
});
export type TRemoveTransactionDto = z.infer<typeof RemoveTransactionDto>;
