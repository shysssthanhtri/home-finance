import React from "react";

import { TransactionItem } from "@/app/(authed)/(dashboard)/_components/transaction-list/transaction-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type TTeamDetailDto } from "@/domain/entities/team.entity";
import { api } from "@/trpc/server";

type Props = {
  team: TTeamDetailDto;
};
export const TransactionList = async ({ team }: Props) => {
  const transactions = await api.transaction.getTodayTransactions({
    id: team.id,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Transaction list</CardTitle>
        <CardDescription>
          <span className="font-semibold text-black">Today</span> you have{" "}
          {transactions.length} transaction(s).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((t) => (
          <TransactionItem
            key={t.id}
            transaction={t}
            className="[&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4"
          />
        ))}
      </CardContent>
    </Card>
  );
};
