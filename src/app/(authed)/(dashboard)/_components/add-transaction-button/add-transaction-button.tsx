import { Plus } from "lucide-react";
import React from "react";

import { AddTransactionDialog } from "@/app/(authed)/(dashboard)/_components/add-transaction-button/add-transaction-dialog";
import { Button } from "@/components/ui/button";
import { type TTeamEntity } from "@/domain/entities/team.entity";

type Props = {
  teamId: TTeamEntity["id"];
};
export const AddTransactionButton = ({ teamId }: Props) => {
  return (
    <AddTransactionDialog teamId={teamId}>
      <Button className="w-full space-x-2">
        <Plus />
        <span>Add item</span>
      </Button>
    </AddTransactionDialog>
  );
};
