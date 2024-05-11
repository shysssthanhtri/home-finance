import { TransactionType } from "@prisma/client";
import { add } from "date-fns";
import { CircleMinus, CirclePlus, Wallet } from "lucide-react";
import React from "react";

import { MoneySummaryCard } from "@/app/(authed)/(dashboard)/_components/monthly-summary/money-summary.card";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api } from "@/trpc/server";

type Props = {
  teamId: TTeamEntity["id"];
};
export const MonthlySummary = async ({ teamId }: Props) => {
  const income = await api.transaction.getMonthlyAmount({
    teamId,
    time: new Date(),
    type: TransactionType.IN,
  });
  const incomeLastMonth = await api.transaction.getMonthlyAmount({
    teamId,
    time: add(new Date(), {
      months: -1,
    }),
    type: TransactionType.IN,
  });
  const outcome = await api.transaction.getMonthlyAmount({
    teamId,
    time: new Date(),
    type: TransactionType.OUT,
  });
  const outcomeLastMonth = await api.transaction.getMonthlyAmount({
    teamId,
    time: add(new Date(), {
      months: -1,
    }),
    type: TransactionType.OUT,
  });
  return (
    <div className="flex flex-col gap-y-4">
      <MoneySummaryCard
        label="Outcome"
        amount={outcome.amount}
        lastAmount={outcomeLastMonth.amount}
        message="from last month"
        icon={<CircleMinus className="text-destructive" size={16} />}
        shouldDecrease
      />
      <MoneySummaryCard
        label="Income"
        amount={income.amount}
        lastAmount={incomeLastMonth.amount}
        message="from last month"
        icon={<CirclePlus className="text-primary" size={16} />}
      />
      <MoneySummaryCard
        label="Save"
        amount={income.amount - outcome.amount}
        lastAmount={incomeLastMonth.amount - outcomeLastMonth.amount}
        message="from last month"
        icon={
          <Wallet
            className={
              income.amount - outcome.amount >= 0
                ? "text-primary"
                : "text-destructive"
            }
            size={16}
          />
        }
      />
    </div>
  );
};
