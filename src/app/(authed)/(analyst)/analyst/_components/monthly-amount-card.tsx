"use client";

import React from "react";

import { MonthlyAmountChart } from "@/app/(authed)/_charts/monthly-amount-chart";
import { convertToMonthlyAmountChartData } from "@/app/(authed)/_charts/monthly-amount-chart/client-helper";
import ChartCard from "@/app/(authed)/(analyst)/analyst/_components/chart-card";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  team: TTeamEntity;
  start: Date;
  end: Date;
  className?: string;
};
export const MonthlyAmountCard = ({ team, start, end, className }: Props) => {
  const { data: items = [] } =
    api.transaction.getMonthlyAmountInDuration.useQuery({
      teamId: team.id,
      start,
      end,
    });

  return (
    <ChartCard className={className}>
      <MonthlyAmountChart
        data={convertToMonthlyAmountChartData(items, start, end)}
      />
    </ChartCard>
  );
};
