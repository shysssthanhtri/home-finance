import React from "react";

import { RemoveMemberButton } from "@/app/(authed)/(teams)/teams/_components/team-members/remove-member-button";
import { Badge } from "@/components/ui/badge";
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
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { getCurrentUser } from "@/server/auth";

type Props = {
  team: TTeamEntity;
  members: TTeamDetailDto["members"];
};
export const TeamMembers = async ({ members, team }: Props) => {
  const curUser = await getCurrentUser();

  return (
    <Card className="pt-4 sm:pt-6">
      <CardContent>
        <Table>
          <TableCaption>A list of team members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="space-x-2">
                  <span>{member.name}</span>
                  {curUser.id === member.id && (
                    <Badge className="h-4 text-xs">You</Badge>
                  )}
                </TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <Badge>{teamMemberRoleDisplay[member.role]}</Badge>
                </TableCell>
                <TableCell>
                  {team.belongToUserId !== member.id && (
                    <RemoveMemberButton teamId={team.id} memberId={member.id} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
