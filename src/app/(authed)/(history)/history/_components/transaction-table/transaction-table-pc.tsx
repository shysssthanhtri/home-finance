"use client";

import React, { useState } from "react";

import { TransactionDialog } from "@/app/(authed)/(history)/history/_components/transaction-dialog";
import { type TransactionTableProps } from "@/app/(authed)/(history)/history/_components/transaction-table/props";
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

export const TransactionTablePC = ({
  transactions,
  onSuccess,
}: TransactionTableProps) => {
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
              <TableCell className="max-w-[200px] truncate">
                {transaction.title}
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-gray-500">
                {transaction.description}
              </TableCell>
              <TableCell>{transactionTypeDisplay[transaction.type]}</TableCell>
              <TableCell>{vndFormatter(transaction.amount)}</TableCell>
              <TableCell>{dateFormatter(transaction.time)}</TableCell>
            </TableRow>
          ))}
          {!transactions.length && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-sm text-gray-500"
              >
                Empty
              </TableCell>
            </TableRow>
          )}
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
