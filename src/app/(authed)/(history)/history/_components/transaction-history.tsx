"use client";

import { endOfDay, startOfMonth } from "date-fns";
import React, { useState } from "react";

import TransactionTable from "@/app/(authed)/(history)/history/_components/transaction-table";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  team: TTeamEntity;
};
export const TransactionHistory = ({ team }: Props) => {
  const [date, setDate] = useState<{ from?: Date; to?: Date }>({
    from: startOfMonth(new Date()),
    to: endOfDay(new Date()),
  });

  const { data: transactions = [] } =
    api.transaction.getTransactionsInDuration.useQuery({
      teamId: team.id,
      from: date.from ?? new Date(),
      to: date.to ?? new Date(),
    });

  return (
    <Card>
      <CardHeader>
        <DatePickerWithRange
          date={date}
          onDateChange={(value) => {
            setDate({
              from: value?.from,
              to: value?.to,
            });
          }}
        />
      </CardHeader>
      <CardContent>
        <TransactionTable transactions={transactions} />
      </CardContent>
    </Card>
  );
};
