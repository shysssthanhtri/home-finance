import React, { useMemo } from "react";

import { DollarIcon } from "@/components/icons/dollar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { vndFormatter } from "@/lib/vnd-formatter";

type Props = {
  name: string;
  number: number;
  lastNumber?: number;
  shouldIncrease?: boolean;
  differenceMessage?: string;
  className?: string;
};

export const MoneySummaryCard = (props: Props) => {
  const {
    name,
    number,
    lastNumber,
    shouldIncrease = true,
    differenceMessage,
    className,
  } = props;

  const { isPositive, difference } = useMemo(() => {
    const difference = lastNumber ? (number - lastNumber) / lastNumber : 0;
    const formattedDifference = Number(difference).toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const isPositive = shouldIncrease ? difference > 0 : difference < 0;

    return {
      difference: formattedDifference,
      isPositive,
    };
  }, [lastNumber, number, shouldIncrease]);

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <DollarIcon />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{vndFormatter(number)}</div>
        <p
          className={cn(
            "text-xs text-muted-foreground",
            isPositive ? "text-green-500" : "text-red-500",
          )}
        >
          {difference}
          {!!differenceMessage && ` ${differenceMessage}`}
        </p>
      </CardContent>
    </Card>
  );
};
