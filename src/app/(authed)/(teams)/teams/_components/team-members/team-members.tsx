import React from "react";

import { MemberRoleBadge } from "@/app/(authed)/(teams)/teams/_components/team-members/member-role-badge";
import { RemoveMemberButton } from "@/app/(authed)/(teams)/teams/_components/team-members/remove-member-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <Card className="hidden pt-4 sm:block sm:pt-6">
      <CardContent>
        <Table>
          <TableCaption>A list of team members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => {
              const isCurUser = curUser.id === member.id;
              const isTeamOwner = team.belongToUserId === member.id;
              return (
                <TableRow key={member.id}>
                  <TableCell className="space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.image ?? ""} />
                      <AvatarFallback>N/A</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <span>{member.name}</span>
                    {isCurUser && <Badge className="h-4 text-xs">You</Badge>}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <MemberRoleBadge
                      teamId={team.id}
                      member={member}
                      disabled={isTeamOwner}
                    />
                  </TableCell>
                  <TableCell>
                    {!isTeamOwner && (
                      <RemoveMemberButton
                        teamId={team.id}
                        memberId={member.id}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
