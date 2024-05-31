import React from "react";

import { AddTransactionButton } from "@/app/(authed)/_components/add-transaction-button";
import { MonthlyChart } from "@/app/(authed)/(dashboard)/_components/monthly-chart";
import { MonthlySummary } from "@/app/(authed)/(dashboard)/_components/monthly-summary";
import { TransactionList } from "@/app/(authed)/(dashboard)/_components/transaction-list";
import { api } from "@/trpc/server";

const Page = async () => {
  console.time("dashboard");
  console.log("Load dashboard 1");
  const team = await api.team.getActiveTeam();
  console.log("Load dashboard 2");
  console.timeEnd("dashboard");
  return (
    <div className="space-y-4">
      <MonthlySummary teamId={team.id} />
      <div className="flex flex-row gap-4">
        <div className="hidden basis-2/5 space-y-4 sm:block">
          <MonthlyChart team={team} />
        </div>
        <div className="basis-1/1 h-fit w-full space-y-4 sm:basis-3/5">
          <AddTransactionButton teamId={team.id} className="w-full" />
          <TransactionList team={team} />
        </div>
      </div>
    </div>
  );
};

export default Page;
