import { add, endOfMonth, startOfMonth } from "date-fns";
import React from "react";

import { MonthlyAmountChart } from "@/app/(authed)/_charts/monthly-amount-chart";
import { getMonthlyAmountChartData } from "@/app/(authed)/_charts/monthly-amount-chart/helper";
import { Card } from "@/components/ui/card";
import { type TTeamEntity } from "@/domain/entities/team.entity";

type Props = {
  team: TTeamEntity;
};
export const MonthlyChart = async ({ team }: Props) => {
  const end = endOfMonth(new Date());
  const start = startOfMonth(
    add(end, {
      months: -3,
    }),
  );

  const data = await getMonthlyAmountChartData(team.id, start, end);

  return (
    <Card className="h-[300px] p-4">
      <MonthlyAmountChart data={data} />
    </Card>
  );
};
