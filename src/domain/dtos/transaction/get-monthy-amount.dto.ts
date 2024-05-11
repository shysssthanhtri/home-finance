import { type z } from "zod";

import { TransactionEntity } from "@/domain/entities/transaction.entity";

export const GetMonthlyAmountDto = TransactionEntity.pick({
  teamId: true,
  time: true,
  type: true,
});
export type TGetMonthlyAmountDto = z.infer<typeof GetMonthlyAmountDto>;
