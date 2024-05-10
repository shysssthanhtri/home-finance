"use client";

import { TeamMemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  teamId: TTeamEntity["id"];
  member: TTeamDetailDto["members"][0];
  disabled?: boolean;
};
export const MemberRoleBadge = ({ teamId, member, disabled }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = api.team.updateMemberRole.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        variant: "successful",
        title: "Done",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: err.message,
      });
    },
  });

  return (
    <Popover>
      {!disabled && (
        <PopoverTrigger>
          <Badge>{teamMemberRoleDisplay[member.role]}</Badge>
        </PopoverTrigger>
      )}
      {disabled && <Badge>{teamMemberRoleDisplay[member.role]}</Badge>}
      <PopoverContent className="flex justify-around">
        {Object.values(TeamMemberRole).map((role) => (
          <Button
            key={role}
            variant="ghost"
            className="h-fit w-fit p-0"
            onClick={() =>
              mutate({
                teamId,
                userId: member.id,
                role,
              })
            }
            disabled={isPending}
          >
            <Badge>{teamMemberRoleDisplay[role]}</Badge>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
