import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { type TInviteJoinTeamInfoDto } from "@/domain/dtos/team/invite-join-team-info.dto";

type Props = {
  invites: TInviteJoinTeamInfoDto[];
};
export const InviteTable = ({ invites }: Props) => {
  return (
    <Card className="pt-4 sm:pt-6">
      <CardContent>
        <Table>
          <TableCaption>Your pending invites to join team.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((invite) => (
              <TableRow key={invite.userId}>
                <TableCell>
                  <div className="font-medium">{invite.userName}</div>
                  <div className="text-sm text-gray-500">
                    {invite.userEmail}
                  </div>
                </TableCell>
                <TableCell>{teamMemberRoleDisplay[invite.role]}</TableCell>
                <TableCell className="text-right">
                  <Button>Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
            {!invites.length && (
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
      </CardContent>
    </Card>
  );
};
