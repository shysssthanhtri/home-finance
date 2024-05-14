"use client";

import React, { useState } from "react";

import { TransactionDialog } from "@/app/(authed)/(history)/history/_components/transaction-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { transactionTypeDisplay } from "@/config/transaction-type";
import { type TTransactionEntity } from "@/domain/entities/transaction.entity";
import { dateFormatter } from "@/lib/date-formatter";
import { vndFormatter } from "@/lib/vnd-formatter";

type Props = {
  transactions: TTransactionEntity[];
  onSuccess?: () => void;
};
const TransactionTable = ({ transactions, onSuccess }: Props) => {
  const [transaction, setTransaction] = useState<TTransactionEntity>();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              onClick={() => setTransaction(transaction)}
            >
              <TableCell>{transaction.title}</TableCell>
              <TableCell className="text-gray-500">
                {transaction.description}
              </TableCell>
              <TableCell>{transactionTypeDisplay[transaction.type]}</TableCell>
              <TableCell>{vndFormatter(transaction.amount)}</TableCell>
              <TableCell>{dateFormatter(transaction.time)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TransactionDialog
        transaction={transaction}
        close={() => setTransaction(undefined)}
        afterSuccess={() => {
          setTransaction(undefined);
          onSuccess?.();
        }}
      />
    </>
  );
};

export default TransactionTable;
