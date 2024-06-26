import React, { useMemo } from "react";

import { InviteDialog } from "@/app/(authed)/(teams)/teams/_components/invite-table/invite-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CardNoHeader } from "@/components/ui/card";
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
  const pcVer = useMemo(
    () => (
      <CardNoHeader className="hidden sm:block">
        <Table>
          <TableCaption>A list of pending invitations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((invite) => (
              <InviteDialog key={invite.userId} invite={invite}>
                <TableRow>
                  <TableCell className="flex items-center gap-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={invite.user.image ?? ""} />
                      <AvatarFallback>N/A</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-base font-medium">
                        {invite.user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {invite.user.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{teamMemberRoleDisplay[invite.role]}</TableCell>
                </TableRow>
              </InviteDialog>
            ))}
          </TableBody>
        </Table>
      </CardNoHeader>
    ),
    [invites],
  );

  const mobileVer = useMemo(
    () => (
      <CardNoHeader className="block sm:hidden">
        <Table>
          <TableCaption>A list of pending invitations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((invite) => (
              <InviteDialog key={invite.userId} invite={invite}>
                <TableRow>
                  <TableCell className="flex items-center gap-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={invite.user.image ?? ""} />
                      <AvatarFallback>N/A</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-base font-medium">
                        {invite.user.name}
                      </div>
                      <div className="text-xs text-gray-500 sm:text-sm">
                        {invite.user.email}
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {teamMemberRoleDisplay[invite.role]}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              </InviteDialog>
            ))}
          </TableBody>
        </Table>
      </CardNoHeader>
    ),
    [invites],
  );

  return (
    <>
      {pcVer}
      {mobileVer}
    </>
  );
};
