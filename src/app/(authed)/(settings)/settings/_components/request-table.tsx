import React from "react";

import { CancelRequestButton } from "@/app/(authed)/(settings)/settings/_components/cancel-request-button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
import { type TRequestJoinTeamInfoDto } from "@/domain/dtos/team";

type Props = {
  requests: TRequestJoinTeamInfoDto[];
};
export const RequestTable = ({ requests }: Props) => {
  return (
    <Table>
      <TableCaption>Your pending requests to join team.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Team name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={[request.teamId, request.userId].join(",")}>
            <TableCell className="font-medium">{request.teamName}</TableCell>
            <TableCell>{teamMemberRoleDisplay[request.role]}</TableCell>
            <TableCell className="text-right">
              <CancelRequestButton
                teamId={request.teamId}
                memberId={request.userId}
              />
            </TableCell>
          </TableRow>
        ))}
        {!requests.length && (
          <TableRow>
            <TableCell
              className="text-center font-medium text-gray-500"
              colSpan={3}
            >
              Empty
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
