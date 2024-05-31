import { type TTransactionEntity } from "@/domain/entities/transaction.entity";

export type TransactionTableProps = {
  transactions: TTransactionEntity[];
  onSuccess?: () => void;
};
