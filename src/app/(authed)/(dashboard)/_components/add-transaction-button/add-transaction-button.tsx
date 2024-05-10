import { Plus } from "lucide-react";
import React from "react";

import { AddTransactionDialog } from "@/app/(authed)/(dashboard)/_components/add-transaction-button/add-transaction-dialog";
import { Button } from "@/components/ui/button";

export const AddTransactionButton = () => {
  return (
    <AddTransactionDialog>
      <Button className="w-full space-x-2">
        <Plus />
        <span>Add item</span>
      </Button>
    </AddTransactionDialog>
  );
};
