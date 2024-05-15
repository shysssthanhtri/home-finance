import { convertToMonthlyAmountChartData } from "@/app/(authed)/_charts/monthly-amount-chart/client-helper";
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
