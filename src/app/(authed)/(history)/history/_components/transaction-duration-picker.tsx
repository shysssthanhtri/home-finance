"use client";

import React, { useMemo } from "react";

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
  const mobileVer = useMemo(
    () => (
      <div className="flex w-full flex-col gap-y-2 sm:hidden">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">From:</span>
          <DatePicker
            value={duration.from}
            onChange={(value) =>
              setDuration({
                ...duration,
                from: value ?? new Date(),
              })
            }
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">To:</span>
          <DatePicker
            value={duration.to}
            onChange={(value) =>
              setDuration({
                ...duration,
                to: value ?? new Date(),
              })
            }
          />
        </div>
      </div>
    ),
    [duration, setDuration],
  );

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

      {mobileVer}
    </>
  );
};
