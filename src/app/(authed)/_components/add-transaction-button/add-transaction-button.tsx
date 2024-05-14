import { Plus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { cn } from "@/lib/utils";

import { AddTransactionDialog } from "./add-transaction-dialog";

type Props = {
  teamId: TTeamEntity["id"];
  className?: string;
  onSuccess?: () => void;
};
export const AddTransactionButton = ({
  teamId,
  className,
  onSuccess,
}: Props) => {
  return (
    <AddTransactionDialog teamId={teamId} onSuccess={onSuccess}>
      <Button className={cn("w-full space-x-2", className)}>
        <Plus />
        <span>Add transaction</span>
      </Button>
    </AddTransactionDialog>
  );
};
