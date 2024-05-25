"use client";

import React, { useMemo } from "react";

import { MemberDialog } from "@/app/(authed)/(teams)/teams/_components/team-members/member-dialog";
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
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";

type Props = {
  user: TUserEntity;
  team: TTeamEntity;
  members: TTeamDetailDto["members"];
};
export const MemberTable = ({ user, team, members }: Props) => {
  const pcVer = useMemo(
    () => (
      <CardNoHeader className="hidden sm:block">
        <Table>
          <TableCaption>A list of team members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <MemberDialog key={member.id}>
                <TableRow>
                  <TableCell className="flex items-center gap-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image ?? ""} />
                      <AvatarFallback>N/A</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-base font-medium">{member.name}</div>
                      <div className="text-sm text-gray-500">
                        {member.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{teamMemberRoleDisplay[member.role]}</TableCell>
                </TableRow>
              </MemberDialog>
            ))}
          </TableBody>
        </Table>
      </CardNoHeader>
    ),
    [members],
  );

  const mobileVer = useMemo(
    () => (
      <CardNoHeader className="block sm:hidden">
        <Table>
          <TableCaption className="mt-0">A list of team members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <MemberDialog key={member.id}>
                <TableRow>
                  <TableCell className="flex items-center gap-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image ?? ""} />
                      <AvatarFallback>N/A</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-base font-medium">{member.name}</div>
                      <div className="text-xs text-gray-500 sm:text-sm">
                        {member.email}
                      </div>
                      <Badge variant="outline" className="mt-2">
                        {teamMemberRoleDisplay[member.role]}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              </MemberDialog>
            ))}
          </TableBody>
        </Table>
      </CardNoHeader>
    ),
    [members],
  );

  return (
    <>
      {pcVer}
      {mobileVer}
    </>
  );
};
