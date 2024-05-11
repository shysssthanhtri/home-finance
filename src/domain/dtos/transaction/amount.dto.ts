import { z } from "zod";

export const AmountDto = z.object({
  amount: z.number(),
});
export type TAmountDto = z.infer<typeof AmountDto>;
