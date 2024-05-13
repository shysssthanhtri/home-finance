import { z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const GetMonthlyAmountInDurationDto = TransactionEntity.pick({
  teamId: true,
}).extend({
  start: z.date(),
  end: z.date(),
});
export type TGetMonthlyAmountInDurationDto = z.infer<
  typeof GetMonthlyAmountInDurationDto
>;
