import { z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const GetTransactionInDurationDto = TransactionEntity.pick({
  teamId: true,
}).extend({
  from: z.date(),
  to: z.date(),
});
export type TGetTransactionInDurationDto = z.infer<
  typeof GetTransactionInDurationDto
>;
