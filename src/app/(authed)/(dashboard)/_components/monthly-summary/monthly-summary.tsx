import React from "react";

import { MoneySummaryCard } from "@/app/(authed)/(dashboard)/_components/money-summary.card";

export const MonthlySummary = () => {
  return (
    <div className="flex gap-x-6">
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
  );
};
