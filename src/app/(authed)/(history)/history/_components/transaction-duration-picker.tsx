"use client";

import React from "react";

import { DatePicker } from "@/components/date-picker";
import { DatePickerWithRange } from "@/components/date-range-picker";

type Duration = {
  from: Date;
  to: Date;
};
type Props = {
  duration: Duration;
  setDuration: (duration: Duration) => void;
};
export const TransactionDurationPicker = ({ duration, setDuration }: Props) => {
  return (
    <>
      <DatePickerWithRange
        date={duration}
        onDateChange={(value) =>
          setDuration({
            from: value?.from ?? new Date(),
            to: value?.to ?? new Date(),
          })
        }
        className="hidden w-fit sm:flex"
      />
      <div className="flex w-full flex-col sm:hidden">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">From:</span>
          <DatePicker />
        </div>
      </div>
    </>
  );
};
