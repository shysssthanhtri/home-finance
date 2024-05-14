"use client";

import React from "react";

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
};
const TransactionTable = ({ transactions }: Props) => {
  return (
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
          <TableRow key={transaction.id}>
            <TableCell>{transaction.title}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transactionTypeDisplay[transaction.type]}</TableCell>
            <TableCell>{vndFormatter(transaction.amount)}</TableCell>
            <TableCell>{dateFormatter(transaction.time)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionTable;
