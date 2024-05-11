import React, { type ReactNode, useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { vndFormatter } from "@/lib/vnd-formatter";

type Props = {
  label: string;
  amount: number;
  icon?: ReactNode;
  lastAmount?: number;
  shouldDecrease?: boolean;
  message?: string;
  className?: string;
};

export const MoneySummaryCard = (props: Props) => {
  const {
    label,
    amount,
    lastAmount,
    shouldDecrease,
    message,
    className,
    icon,
  } = props;

  const { isPositive, difference } = useMemo(() => {
    const difference = lastAmount ? (amount - lastAmount) / lastAmount : 0;
    const formattedDifference = Number(difference).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const isPositive = shouldDecrease ? difference <= 0 : difference >= 0;

    return {
      difference: formattedDifference,
      isPositive,
    };
  }, [lastAmount, amount, shouldDecrease]);

  return (
    <Card className={className}>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-0 sm:p-4 sm:pb-0">
        <CardTitle className="text-base font-normal sm:text-lg sm:font-normal">
          {label}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="sm:p-4 sm:pt-0">
        <div className="text-2xl font-bold">{vndFormatter(amount)}</div>
        {!!lastAmount && (
          <p
            className={cn(
              "text-xs text-muted-foreground",
              isPositive ? "text-green-500" : "text-red-500",
            )}
          >
            {difference}
            {!!message && ` ${message}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
