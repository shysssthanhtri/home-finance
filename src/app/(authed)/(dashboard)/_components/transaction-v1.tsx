import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { vndFormatter } from "@/lib/vnd-formatter";

export type Transaction = {
  type: string;
  number: number;
};

type Props = {
  transaction: Transaction;
  className?: string;
};

export const TransactionItemV1 = ({ transaction, className }: Props) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{transaction.type}</p>
      </div>
      <div className="ml-auto font-medium">
        {vndFormatter(transaction.number)}
      </div>
    </div>
  );
};
