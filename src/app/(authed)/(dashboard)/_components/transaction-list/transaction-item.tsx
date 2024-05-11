"use client";

import { TransactionType } from "@prisma/client";
import { format } from "date-fns";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { type TTransactionEntity } from "@/domain/entities/transaction.entity";
import { cn } from "@/lib/utils";
import { vndFormatter } from "@/lib/vnd-formatter";

type Props = {
  transaction: TTransactionEntity;
  className?: string;
};
export const TransactionItem = ({ transaction, className }: Props) => {
  return (
    <div className={cn("flex flex-col gap-y-1", className)}>
      <div className="font-bold">{transaction.title}</div>
      <div
        className="text-xs text-gray-500"
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {transaction.description}
      </div>
      <div className="flex gap-x-2">
        <Badge variant="outline">
          {format(transaction.time, "MM/dd/yyyy")}
        </Badge>
        <Badge
          variant={
            transaction.type === TransactionType.IN ? "default" : "destructive"
          }
        >
          {vndFormatter(transaction.amount)}
        </Badge>
      </div>
    </div>
  );
};
