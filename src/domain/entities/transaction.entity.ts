import { z } from "zod";

import { TransactionSchema } from "@/schemas/_generated";

export const TransactionEntity = z.object(TransactionSchema.shape).extend({
  title: z.string().min(3).max(30),
  description: z.string().min(0).max(1000).nullish(),
  amount: z.number().min(1000),
});
export type TTransactionEntity = z.infer<typeof TransactionEntity>;
