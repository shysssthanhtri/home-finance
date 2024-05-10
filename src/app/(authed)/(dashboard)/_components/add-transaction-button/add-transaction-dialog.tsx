"use client";
import React, { useState } from "react";

import { TransactionForm } from "@/app/(authed)/(dashboard)/_components/forms/transaction-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  children: React.ReactNode;
};
export const AddTransactionDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <TransactionForm />
      </DialogContent>
    </Dialog>
  );
};
