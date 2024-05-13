import { z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const MonthlyAmountDto = TransactionEntity.pick({
  amount: true,
  type: true,
}).extend({
  month: z.number(),
  year: z.number(),
});
export type TMonthlyAmountDto = z.infer<typeof MonthlyAmountDto>;
