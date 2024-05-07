import { TeamMemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { type TUserEntity } from "@/domain/entities/user.entity";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

type Props = {
  curUser: TUserEntity;
  team: TTeamEntity;
  member: TTeamDetailDto["members"][0];
};
export const EditMemberRolePopover = ({ team, member, curUser }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const utils = api.useUtils();
  const { mutate, isPending } = api.team.updateMemberRole.useMutation({
    onSuccess: async () => {
      router.refresh();
      toast({
        title: "Saved",
        variant: "successful",
      });

      void utils.team.getTeam.refetch({ id: team.id });
    },
    onError: (err) => {
      toast({
        title: "Something wrong",
        variant: "destructive",
        description: err.message,
      });
    },
  });
  const button = useCallback(
    (type: "mobile" | "pc") => (
      <Button
        variant="ghost"
        className={cn(
          "h-fit p-0",
          type === "mobile" ? "block sm:hidden" : "hidden sm:block",
        )}
      >
        <Badge variant="outline">{teamMemberRoleDisplay[member.role]}</Badge>
      </Button>
    ),
    [member.role],
  );

  const open = useMemo(
    () => (curUser.id === member.id ? false : undefined),
    [curUser.id, member.id],
  );

  const onClick = useCallback(
    (role: TeamMemberRole) => {
      mutate({
        userId: member.id,
        id: team.id,
        role,
      });
    },
    [member.id, mutate, team.id],
  );

  return (
    <>
      <Popover open={open}>
        <PopoverTrigger asChild>{button("pc")}</PopoverTrigger>
        <PopoverContent className="flex justify-around">
          {Object.values(TeamMemberRole).map((role) => (
            <Button
              key={role}
              variant="ghost"
              className="h-fit p-0"
              onClick={() => onClick(role)}
              disabled={isPending}
            >
              <Badge variant={member.role === role ? "default" : "outline"}>
                {teamMemberRoleDisplay[role]}
              </Badge>
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      <Dialog open={open}>
        <DialogTrigger asChild>{button("mobile")}</DialogTrigger>
        <DialogContent className="flex flex-col items-center">
          {Object.values(TeamMemberRole).map((role) => (
            <Button
              key={role}
              variant="ghost"
              className="h-fit w-fit p-0"
              onClick={() => onClick(role)}
              disabled={isPending}
            >
              <Badge variant={member.role === role ? "default" : "outline"}>
                {teamMemberRoleDisplay[role]}
              </Badge>
            </Button>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};
