"use client";

import React, { useState } from "react";

import { TransactionDialog } from "@/app/(authed)/(history)/history/_components/transaction-dialog";
import { type TransactionTableProps } from "@/app/(authed)/(history)/history/_components/transaction-table/props";
import { Badge } from "@/components/ui/badge";
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

export const TransactionTableMobile = ({
  transactions,
  onSuccess,
}: TransactionTableProps) => {
  const [transaction, setTransaction] = useState<TTransactionEntity>();
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t) => (
            <TableRow key={t.id} onClick={() => setTransaction(t)}>
              <TableCell className="flex justify-between">
                <div className="max-w-[150px]">
                  <div className="truncate text-base">{t.title}</div>
                  <div className="truncate text-xs text-gray-500">
                    {t.description}
                  </div>
                  <Badge className="mt-2" variant="outline">
                    {dateFormatter(t.time)}
                  </Badge>
                </div>
                <div className="flex flex-col gap-y-1">
                  <Badge variant="outline">{vndFormatter(t.amount)}</Badge>
                  <Badge variant="outline">
                    {transactionTypeDisplay[t.type]}
                  </Badge>
                </div>
              </TableCell>
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
