import React from "react";

import { type TransactionTableProps } from "@/app/(authed)/(history)/history/_components/transaction-table/props";
import { TransactionTableMobile } from "@/app/(authed)/(history)/history/_components/transaction-table/transaction-table-mobile";
import { TransactionTablePC } from "@/app/(authed)/(history)/history/_components/transaction-table/transaction-table-pc";

export const TransactionTable = (props: TransactionTableProps) => {
  return (
    <>
      <div className="hidden sm:block">
        <TransactionTablePC {...props} />
      </div>
      <div className="block sm:hidden">
        <TransactionTableMobile {...props} />
      </div>
    </>
  );
};
