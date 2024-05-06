"use client";

import { Loader2 } from "lucide-react";
import React from "react";

import { EditTeamInfoButton } from "@/app/(authed)/(teams)/teams/_components/edit-team-info-button";
import { InviteMemberButton } from "@/app/(authed)/(teams)/teams/_components/invite-member-button";
import { MemberActionsButton } from "@/app/(authed)/(teams)/teams/_components/member-actions-button";
import { TeamIdBadge } from "@/app/(authed)/(teams)/teams/_components/team-id-badge";
import { useTeamInfoControl } from "@/app/(authed)/(teams)/teams/_contexts/use-team-info-control";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

export const TeamInfo = () => {
  const { team, user, isLoading } = useTeamInfoControl();

  if (!team) {
    return null;
  }

  if (isLoading) {
    return (
      <Card className="flex h-[200px] items-center justify-center">
        <Loader2 className="h-[50px] w-[50px] animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="space-y-2 p-4 sm:space-y-4 sm:p-6">
      <div className="block items-center justify-between space-y-2 sm:flex sm:space-y-0">
        <div className="flex flex-row items-center gap-x-2 text-base sm:text-lg">
          <span>{team.name}</span>
          <TeamIdBadge id={team.id} />
        </div>
        <div className="flex gap-2">
          <EditTeamInfoButton team={team} />
          <InviteMemberButton team={team} />
        </div>
      </div>

      <Separator />

      <div className="block sm:hidden">
        {team.members.map((member, index) => (
          <div key={member.id} className="space-y-2">
            <div>
              <div className="text-base">{member.name}</div>
              <div className="text-xs text-gray-500">{member.email}</div>
            </div>
            <Badge variant="outline">
              {teamMemberRoleDisplay[member.role]}
            </Badge>
            {index !== team.members.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <div className="hidden sm:block">
        <Table>
          <TableCaption>Members of team</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="space-x-2 font-medium">
                  <span>{member.name}</span>
                  {member.id === user?.id && (
                    <Badge variant="default">You</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {teamMemberRoleDisplay[member.role]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {team.belongToUserId !== member.id && (
                    <MemberActionsButton team={team} member={member} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
