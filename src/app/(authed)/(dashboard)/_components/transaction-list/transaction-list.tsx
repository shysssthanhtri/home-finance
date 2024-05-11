import React from "react";

import { TransactionItemV1 } from "@/app/(authed)/(dashboard)/_components/transaction-v1";
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

  console.log({ transactions });

  return (
    <Card className="h-fit basis-1/2">
      <CardHeader>
        <CardTitle className="text-base">Transaction list</CardTitle>
        <CardDescription>You have 123 transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <TransactionItemV1
            key={index}
            transaction={{
              type: index % 2 === 0 ? "Income" : "Outcome",
              number: 12000 * (index + 1),
            }}
            className="[&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4"
          />
        ))}
      </CardContent>
    </Card>
  );
};
