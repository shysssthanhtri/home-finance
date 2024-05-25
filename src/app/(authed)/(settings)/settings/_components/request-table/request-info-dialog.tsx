"use client";

import React from "react";

import { CancelRequestButton } from "@/app/(authed)/(settings)/settings/_components/request-table/cancel-request-button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
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
        <div className="space-y-2">
          <div className="flex space-x-2">
            <div className="font-medium">Team name:</div>
            <div className="text-gray-600">{request.teamName}</div>
          </div>
          <div className="flex space-x-2">
            <div className="font-medium">Role:</div>
            <div className="text-gray-600">
              {teamMemberRoleDisplay[request.role]}
            </div>
          </div>
        </div>
        <DialogFooter>
          <CancelRequestButton teamId={request.teamId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
