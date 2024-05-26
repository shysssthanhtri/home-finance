"use client";

import React from "react";

import { CancelInviteButton } from "@/app/(authed)/(teams)/teams/_components/invite-table/cancel-invite-button";
import { InviteInfoForm } from "@/app/(authed)/(teams)/teams/_forms/invite-info-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { type TInviteJoinTeamInfoDto } from "@/domain/dtos/team/invite-join-team-info.dto";

type Props = {
  invite: TInviteJoinTeamInfoDto[][0];
  children: React.ReactNode;
};
export const InviteDialog = ({ invite, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite info</DialogTitle>
        </DialogHeader>
        <Separator />
        <InviteInfoForm invite={invite} />
        <DialogFooter>
          <CancelInviteButton teamId={invite.teamId} userId={invite.userId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
