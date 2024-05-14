import React from "react";

import { AddTransactionButton } from "@/app/(authed)/_components/add-transaction-button";
import { PageTitle } from "@/app/(authed)/_components/page-title";
import { MonthlyChart } from "@/app/(authed)/(dashboard)/_components/monthly-chart";
import { MonthlySummary } from "@/app/(authed)/(dashboard)/_components/monthly-summary";
import { TransactionList } from "@/app/(authed)/(dashboard)/_components/transaction-list";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return (
    <div className="hidden space-y-6 sm:block">
      <PageTitle title="Dashboard" />
      <div className="flex flex-row gap-6">
        <div className="basis-1/2 space-y-6">
          <MonthlySummary teamId={team.id} />
          <MonthlyChart team={team} />
        </div>
        <div className="h-fit w-full basis-1/2 space-y-6">
          <AddTransactionButton teamId={team.id} />
          <TransactionList team={team} />
        </div>
      </div>
    </div>
  );
};

export default Page;
