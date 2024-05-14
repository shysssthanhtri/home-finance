"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = Readonly<React.HTMLAttributes<HTMLDivElement>> & {
  date?: { from?: Date; to?: Date };
  onDateChange?: (date?: { from?: Date; to?: Date }) => void | Promise<void>;
};

export function DatePickerWithRange({
  className,
  date: _date,
  onDateChange,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: _date?.from ?? new Date(),
    to: _date?.to ?? new Date(),
  });

  const value = React.useMemo(() => {
    if (!date?.from) return <span>Pick a date</span>;
    if (!date.to) return format(date.from, "LLL dd, y");
    return (
      <>
        {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
      </>
    );
  }, [date]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (value === false) {
            void onDateChange?.(date);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
