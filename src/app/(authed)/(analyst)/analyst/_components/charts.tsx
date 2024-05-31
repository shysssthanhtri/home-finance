"use client";

import { add, endOfDay, startOfMonth } from "date-fns";
import React, { useState } from "react";

import { MonthlyAmountCard } from "@/app/(authed)/(analyst)/analyst/_components/monthly-amount-card";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type TTeamEntity } from "@/domain/entities/team.entity";

type Props = {
  team: TTeamEntity;
};
export const Charts = ({ team }: Props) => {
  const [date, setDate] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(
      add(new Date(), {
        months: -3,
      }),
    ),
    to: endOfDay(new Date()),
  });

  return (
    <Card>
      <CardHeader>
        <DatePickerWithRange
          date={date}
          onDateChange={(value) => {
            setDate({
              from: value?.from ?? new Date(),
              to: value?.to ?? new Date(),
            });
          }}
        />
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 [&>div]:h-[200px] sm:[&>div]:h-[350px]">
        <MonthlyAmountCard team={team} start={date.from} end={date.to} />
      </CardContent>
    </Card>
  );
};
