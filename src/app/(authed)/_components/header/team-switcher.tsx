"use client";

import { CirclePlus, GitPullRequestArrow, User } from "lucide-react";
import React, { type ReactNode, useCallback } from "react";

import { CreateTeamDialog } from "@/app/(authed)/_components/header/create-team-dialog";
import { useControlTeamSwitcher } from "@/app/(authed)/_components/header/hooks/use-control-team-switcher";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";

type Props = {
  activeTeam: TTeamDetailDto;
  personalTeam?: TTeamEntity;
  joinedTeams: TTeamEntity[];
};
export const TeamSwitcher = ({
  activeTeam,
  personalTeam,
  joinedTeams,
}: Props) => {
  const { createTeamDialog, setActiveTeam, select } = useControlTeamSwitcher();

  const label = useCallback(
    (child: ReactNode) => (
      <SelectLabel className="text-xs text-gray-400">{child}</SelectLabel>
    ),
    [],
  );

  const onValueChange = useCallback(
    (newActiveTeam: TTeamEntity["id"]) => {
      setActiveTeam.mutate({
        id: newActiveTeam,
      });
    },
    [setActiveTeam],
  );

  return (
    <>
      <Select
        value={activeTeam.id}
        onValueChange={onValueChange}
        disabled={setActiveTeam.isPending}
        {...select}
      >
        <SelectTrigger className="h-8 w-[200px]">
          <SelectValue placeholder="Select a team" />
        </SelectTrigger>
        <SelectContent>
          {!!personalTeam && (
            <SelectGroup>
              {label("Personal team")}
              <SelectItem value={personalTeam.id}>
                <span className="flex items-center gap-x-2">
                  <User size="16px" />
                  {personalTeam.name}
                </span>
              </SelectItem>
            </SelectGroup>
          )}
          {!!joinedTeams.length && (
            <SelectGroup>
              {label("Joined teams")}
              {joinedTeams.map((team) => (
                <SelectItem key={team.id} value={team.id}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectGroup>
          )}
          <SelectSeparator />
          <SelectGroup>
            <Button
              variant="ghost"
              className="flex h-8 w-full justify-start gap-2 text-sm font-normal"
              onClick={() => createTeamDialog.onOpenChange(true)}
            >
              <CirclePlus size="16px" />
              Create new
            </Button>
            <Button
              variant="ghost"
              className="flex h-8 w-full justify-start gap-2 text-sm font-normal"
            >
              <GitPullRequestArrow size="16px" />
              Request join
            </Button>
          </SelectGroup>
        </SelectContent>
      </Select>
      <CreateTeamDialog {...createTeamDialog} />
    </>
  );
};
