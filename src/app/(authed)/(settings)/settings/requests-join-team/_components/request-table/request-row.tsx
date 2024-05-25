"use client";
import React from "react";

import { RequestInfoDialog } from "@/app/(authed)/(settings)/settings/requests-join-team/_components/request-table/request-info-dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
import { type TRequestJoinTeamInfoDto } from "@/domain/dtos/team";

type Props = {
  request: TRequestJoinTeamInfoDto;
};
export const RequestRow = ({ request }: Props) => {
  return (
    <RequestInfoDialog request={request}>
      <TableRow>
        <TableCell className="font-medium">{request.teamName}</TableCell>
        <TableCell>{teamMemberRoleDisplay[request.role]}</TableCell>
      </TableRow>
    </RequestInfoDialog>
  );
};
