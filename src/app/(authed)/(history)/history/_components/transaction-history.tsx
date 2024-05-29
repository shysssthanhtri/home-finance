"use client";

import { Filter, Loader2, Plus } from "lucide-react";
import React from "react";

import { AddTransactionDialog } from "@/app/(authed)/_components/add-transaction-button/add-transaction-dialog";
import { FilterSheet } from "@/app/(authed)/(history)/history/_components/filter-sheet";
import { TransactionDurationPicker } from "@/app/(authed)/(history)/history/_components/transaction-duration-picker";
import { TransactionTable } from "@/app/(authed)/(history)/history/_components/transaction-table";
import { useTransactionHistory } from "@/app/(authed)/(history)/history/_hooks/use-transaction-history";
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
      <CardHeader className="flex flex-col items-center justify-between gap-y-2 space-y-0 sm:flex-row">
        <TransactionDurationPicker
          duration={options.duration}
          setDuration={(value) =>
            setOptions((prev) => ({
              ...prev,
              duration: value,
            }))
          }
        />
        <div className="flex w-full flex-col items-center gap-2 sm:w-fit sm:flex-row">
          <FilterSheet options={options} setOptions={setOptions}>
            <Button size="sm" variant="outline">
              <Filter size={18} />
            </Button>
          </FilterSheet>
          <AddTransactionDialog teamId={team.id} onSuccess={refetch}>
            <Button size="sm">
              <Plus size={18} />
            </Button>
          </AddTransactionDialog>
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
