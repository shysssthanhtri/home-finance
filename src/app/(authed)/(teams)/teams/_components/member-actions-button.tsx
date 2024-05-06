import { Settings } from "lucide-react";
import React, { useState } from "react";

import { EditMemberRoleDialog } from "@/app/(authed)/(teams)/teams/_components/edit-member-role-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";

type Props = {
  team: TTeamEntity;
  member: TTeamDetailDto["members"][0];
};
export const MemberActionsButton = ({ team, member }: Props) => {
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setEditRoleOpen(true)}>
            Update role
          </DropdownMenuItem>
          <DropdownMenuItem>Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditMemberRoleDialog
        team={team}
        member={member}
        open={editRoleOpen}
        close={() => setEditRoleOpen(false)}
      />
    </>
  );
};
