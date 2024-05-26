import React, { useRef } from "react";

import {
  FilterForm,
  type Ref,
} from "@/app/(authed)/(history)/history/_forms/filter-form";
import { type useTransactionHistory } from "@/app/(authed)/(history)/history/_hooks/use-transaction-history";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Props = {
  children: React.ReactNode;
  options: ReturnType<typeof useTransactionHistory>["options"];
  setOptions: ReturnType<typeof useTransactionHistory>["setOptions"];
};
export const FilterSheet = ({ children, options, setOptions }: Props) => {
  const ref = useRef<Ref>(null);
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <div className="space-y-4">
          <SheetHeader>
            <SheetTitle>Filter transactions</SheetTitle>
          </SheetHeader>
          <Separator />

          <FilterForm
            ref={ref}
            options={options}
            onSubmit={(value) => {
              setOptions((prev) => ({
                ...prev,
                ...value,
              }));
            }}
          />
        </div>

        <SheetFooter>
          <SheetClose
            asChild
            onClick={() => {
              ref.current?.submit();
            }}
          >
            <Button size="sm">Apply</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
