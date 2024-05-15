import { TransactionType } from "@prisma/client";
import { add, getMonth, getYear } from "date-fns";

import { type MonthlyAmountDataItem } from "@/app/(authed)/_charts/monthly-amount-chart/monthly-amount-chart";
import { type TMonthlyAmountDto } from "@/domain/dtos/transaction/monthly-amount.dto";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api } from "@/trpc/server";

export const getMonthlyAmountChartData = async (
  teamId: TTeamEntity["id"],
  start: Date,
  end: Date,
) => {
  const summaries = await api.transaction.getMonthlyAmountInDuration({
    teamId,
    start,
    end,
  });
  return convertToMonthlyAmountChartData(summaries, start, end);
};

export const convertToMonthlyAmountChartData = (
  summaries: TMonthlyAmountDto[],
  start: Date,
  end: Date,
): MonthlyAmountDataItem[] => {
  const data: MonthlyAmountDataItem[] = [];
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
      in: inAmount,
      out: outAmount,
    });
  }

  return data;
};
