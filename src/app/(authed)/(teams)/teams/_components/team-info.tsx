"use client";

import { Loader2, Settings } from "lucide-react";
import React, { useContext } from "react";

import { TeamContext } from "@/app/(authed)/_contexts/team.context";
import { InviteMemberButton } from "@/app/(authed)/(teams)/teams/_components/invite-member-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { api } from "@/trpc/react";

export const TeamInfo = () => {
  const { team, user } = useContext(TeamContext);
  const { isLoading, data } = api.team.getTeam.useQuery(
    { id: team?.id ?? "" },
    {
      enabled: !!team,
    },
  );

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
        <div className="space-y-1 text-sm sm:space-y-2 sm:text-base">
          <div className="space-x-2">
            <span className="text-gray-400">Team id:</span>
            <span>{data?.id}</span>
          </div>
          <div className="space-x-2">
            <span className="text-gray-400">Team name:</span>
            <span>{data?.name}</span>
          </div>
        </div>
        <InviteMemberButton />
      </div>

      <Separator />

      <div className="block sm:hidden">
        {data?.members.map((member, index) => (
          <div key={member.id} className="space-y-2">
            <div>
              <div className="text-base">{member.name}</div>
              <div className="text-xs text-gray-500">{member.email}</div>
            </div>
            <Badge variant="outline">
              {teamMemberRoleDisplay[member.role]}
            </Badge>
            {index !== data.members.length - 1 && <Separator />}
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
            {data?.members.map((member) => (
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Update role</DropdownMenuItem>
                      <DropdownMenuItem>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
