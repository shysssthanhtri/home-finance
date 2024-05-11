"use client";
import React, { useState } from "react";

import { TransactionForm } from "@/app/(authed)/(dashboard)/_components/forms/transaction-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
};
export const AddTransactionDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
        </DialogHeader>
        <Separator />
        <TransactionForm />
        <Separator />
        <DialogFooter>
          <div className="mt-2 flex items-center space-x-2 sm:mt-0">
            <Checkbox
              id="terms"
              checked={keepCreating}
              onCheckedChange={(value: boolean) => {
                setKeepCreating(value);
              }}
            />
            <label htmlFor="terms" className="text-xs text-gray-400">
              Save to create another one.
            </label>
          </div>
          <Button size="sm">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
