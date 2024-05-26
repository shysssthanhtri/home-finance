import { z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const GetTransactionInDurationDto = TransactionEntity.pick({
  teamId: true,
})
  .extend({
    duration: z.object({
      from: z.date(),
      to: z.date(),
    }),
  })
  .and(
    TransactionEntity.pick({
      type: true,
    }).partial(),
  );
export type TGetTransactionInDurationDto = z.infer<
  typeof GetTransactionInDurationDto
>;
