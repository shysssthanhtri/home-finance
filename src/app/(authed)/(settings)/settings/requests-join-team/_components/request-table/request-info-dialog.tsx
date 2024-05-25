"use client";

import React from "react";

import { CancelRequestButton } from "@/app/(authed)/(settings)/settings/requests-join-team/_components/request-table/cancel-request-button";
import { RequestInfoForm } from "@/app/(authed)/(settings)/settings/requests-join-team/_components/request-table/request-info-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type TRequestJoinTeamInfoDto } from "@/domain/dtos/team";

type Props = {
  request: TRequestJoinTeamInfoDto;
  children: React.ReactNode;
};
export const RequestInfoDialog = ({ children, request }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request info</DialogTitle>
        </DialogHeader>
        <RequestInfoForm request={request} />
        <DialogFooter>
          <CancelRequestButton teamId={request.teamId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
