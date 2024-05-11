import React from "react";

import { TransactionItem } from "@/app/(authed)/(dashboard)/_components/transaction";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type TTeamDetailDto } from "@/domain/entities/team.entity";

type Props = {
  team: TTeamDetailDto;
};
export const TransactionList = ({ team }: Props) => {
  return (
    <Card className="h-fit basis-1/2">
      <CardHeader>
        <CardTitle className="text-base">Transaction list</CardTitle>
        <CardDescription>You have 123 transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <TransactionItem
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
