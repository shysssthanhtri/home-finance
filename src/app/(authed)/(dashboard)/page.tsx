import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { AddTransactionButton } from "@/app/(authed)/(dashboard)/_components/add-transaction-button";
import { MoneySummaryCard } from "@/app/(authed)/(dashboard)/_components/money-summary.card";
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
        <div className="shrink-0 basis-1/2 space-y-6">
          <div className="flex h-fit flex-row gap-4">
            <MoneySummaryCard
              name="Income"
              number={12000}
              lastNumber={10000}
              differenceMessage="from last day"
              className="basis-1/2"
            />
            <MoneySummaryCard
              name="Outcome"
              number={12000}
              lastNumber={10000}
              shouldIncrease={false}
              differenceMessage="from last month"
              className="basis-1/2"
            />
          </div>
          <Card className="h-[400px] p-4">
            <OverviewChart />
          </Card>
        </div>
        <div className="w-full space-y-6">
          <AddTransactionButton teamId={team.id} />
          <TransactionList team={team} />
        </div>
      </div>
    </div>
  );
};

export default Page;
