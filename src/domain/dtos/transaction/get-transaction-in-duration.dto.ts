import { TransactionType } from "@prisma/client";
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
    types: z.array(z.nativeEnum(TransactionType)),
  })
  .partial({ types: true });
export type TGetTransactionInDurationDto = z.infer<
  typeof GetTransactionInDurationDto
>;
