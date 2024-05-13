import { TransactionType } from "@prisma/client";
import { add, endOfMonth, getMonth, getYear, startOfMonth } from "date-fns";
import React from "react";

import {
  type DataItem,
  OverviewChart,
} from "@/app/(authed)/(dashboard)/_components/monthly-chart/overview-chart";
import { Card } from "@/components/ui/card";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api } from "@/trpc/server";

type Props = {
  team: TTeamEntity;
};
export const MonthlyChart = async ({ team }: Props) => {
  const end = endOfMonth(new Date());
  const start = startOfMonth(
    add(end, {
      months: -6,
    }),
  );

  const summaries = await api.transaction.getMonthlyAmountInDuration({
    teamId: team.id,
    start,
    end,
  });

  const data: DataItem[] = [];
  for (let i = start; i <= end; i = add(i, { months: 1 })) {
    const year = getYear(i);
    const month = getMonth(i) + 1;
    const inItem = summaries.find(
      (s) =>
        s.year === year && s.month === month && s.type === TransactionType.IN,
    );
    const outItem = summaries.find(
      (s) =>
        s.year === year && s.month === month && s.type === TransactionType.OUT,
    );
    const inAmount = inItem?.amount ?? 0;
    const outAmount = outItem?.amount ?? 0;
    data.push({
      year,
      month,
      in: inAmount / 1000,
      out: outAmount / 1000,
      save: (inAmount - outAmount) / 1000,
    });
  }

  return (
    <Card className="h-[300px] p-4">
      <OverviewChart data={data} />
    </Card>
  );
};
