import React from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";

type Props = {
  team: TTeamEntity;
  member: TTeamDetailDto["members"][0];
  open?: boolean;
  close?: () => void;
};
export const EditMemberRoleDialog = ({ team, member, open, close }: Props) => {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>Hello world</DialogContent>
    </Dialog>
  );
};
