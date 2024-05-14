"use client";

import { endOfDay, startOfMonth } from "date-fns";
import React, { useCallback, useState } from "react";

import { AddTransactionButton } from "@/app/(authed)/_components/add-transaction-button";
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

  const utils = api.useUtils();
  const refetch = useCallback(
    () => utils.transaction.getTransactionsInDuration.refetch(),
    [utils],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <DatePickerWithRange
          date={date}
          onDateChange={(value) => {
            setDate({
              from: value?.from,
              to: value?.to,
            });
          }}
        />
        <AddTransactionButton
          teamId={team.id}
          className="w-[200px]"
          onSuccess={refetch}
        />
      </CardHeader>
      <CardContent>
        <TransactionTable transactions={transactions} onSuccess={refetch} />
      </CardContent>
    </Card>
  );
};
