import React from "react";

import { MoneySummaryCard } from "@/app/(dashboard)/_components/money-summary.card";
import { TransactionItem } from "@/app/(dashboard)/_components/transaction";
import { DatePickerWithRange } from "@/components/date-range-picker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DashboardPage = () => {
  return (
    <div className="hidden space-y-6 sm:block">
      <Card className="flex justify-between p-6">
        <CardTitle className="flex items-center">Dashboard</CardTitle>
        <DatePickerWithRange />
      </Card>
      <div className="flex flex-row gap-6">
        <div className="flex h-fit shrink-0 basis-1/2 flex-row gap-4">
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
        <Card className="basis-1/2">
          <CardHeader>
            <CardTitle className="text-base">Transaction list</CardTitle>
            <CardDescription>You have 123 transactions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <TransactionItem
                key={index}
                transaction={{
                  type: index % 2 === 0 ? "Income" : "Outcome",
                  number: 12000 * (index + 1),
                }}
                className="[&:not(:last-child)]:border-b [&:not(:last-child)]:pb-4"
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
