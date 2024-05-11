import { TransactionType } from "@prisma/client";

export const transactionTypeDisplay: Record<TransactionType, string> = {
  [TransactionType.IN]: "Income",
  [TransactionType.OUT]: "Outcome",
};
