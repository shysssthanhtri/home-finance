import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { AddTransactionButton } from "@/app/(authed)/(dashboard)/_components/add-transaction-button";
import { MonthlySummary } from "@/app/(authed)/(dashboard)/_components/monthly-summary";
import { OverviewChart } from "@/app/(authed)/(dashboard)/_components/overview-chart";
import { TransactionList } from "@/app/(authed)/(dashboard)/_components/transaction-list";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return (
    <div className="hidden space-y-6 sm:block">
      <PageTitle title="Dashboard" />
      <div className="flex flex-row gap-6">
        <div className="basis-1/2 space-y-6">
          <MonthlySummary teamId={team.id} />
          <Card className="h-[400px] p-4">
            <OverviewChart />
          </Card>
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
