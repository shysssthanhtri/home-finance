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
};

export const MoneySummaryCard = (props: Props) => {
  const { name, number, lastNumber, shouldIncrease = true } = props;

  const { isPositive, difference } = useMemo(() => {
    const difference =
      (lastNumber ? (number - lastNumber) / lastNumber : 0) * 100;
    const formattedDifference = (Math.round(difference * 100) / 100).toFixed(2);
    const isPositive = shouldIncrease ? difference > 0 : difference < 0;
    return {
      difference: formattedDifference,
      isPositive,
    };
  }, [lastNumber, number, shouldIncrease]);

  return (
    <Card>
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
          {!isPositive && "-"}
          {difference}
        </p>
      </CardContent>
    </Card>
  );
};
