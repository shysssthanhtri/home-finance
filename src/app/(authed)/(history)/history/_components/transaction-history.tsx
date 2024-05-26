"use client";

import { Filter, Loader2 } from "lucide-react";
import React from "react";

import { AddTransactionButton } from "@/app/(authed)/_components/add-transaction-button";
import { FilterSheet } from "@/app/(authed)/(history)/history/_components/filter-sheet";
import { TransactionTable } from "@/app/(authed)/(history)/history/_components/transaction-table";
import { useTransactionHistory } from "@/app/(authed)/(history)/history/_hooks/use-transaction-history";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type TTeamEntity } from "@/domain/entities/team.entity";

type Props = {
  team: TTeamEntity;
};
export const TransactionHistory = ({ team }: Props) => {
  const { options, setOptions, refetch, transactions, isPending } =
    useTransactionHistory({ teamId: team.id });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <DatePickerWithRange
          date={options.duration}
          onDateChange={(value) => {
            setOptions((prev) => ({
              ...prev,
              duration: {
                from: value?.from ?? new Date(),
                to: value?.to ?? new Date(),
              },
            }));
          }}
        />
        <div className="flex items-center gap-x-2">
          <FilterSheet options={options} setOptions={setOptions}>
            <Button size="sm" className="w-[200px]" variant="outline">
              <Filter className="mr-2" size={18} />
              Filter
            </Button>
          </FilterSheet>
          <AddTransactionButton
            teamId={team.id}
            className="w-[200px]"
            onSuccess={refetch}
          />
        </div>
      </CardHeader>
      <CardContent>
        <TransactionTable transactions={transactions} onSuccess={refetch} />
        {isPending && (
          <div className="flex h-[200px] items-center justify-center">
            <Loader2 className="animate-spin" size={32} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
