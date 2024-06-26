"use client";

import {
  CirclePlus,
  GitPullRequestArrow,
  type LucideIcon,
  User,
} from "lucide-react";
import React, { type ReactNode, useCallback } from "react";

import { CreateTeamDialog } from "@/app/(authed)/_components/header/create-team-dialog";
import { useControlTeamSwitcher } from "@/app/(authed)/_components/header/hooks/use-control-team-switcher";
import { RequestJoinTeamDialog } from "@/app/(authed)/_components/header/request-join-team-dialog";
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
  const { createTeamDialog, setActiveTeam, select, requestJoinTeamDialog } =
    useControlTeamSwitcher();

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

  const actionButton = useCallback(
    (props: ActionButtonProps) => (
      <Button
        variant="ghost"
        className="flex h-8 w-full justify-start gap-2 text-sm font-normal"
        onClick={props.onClick}
      >
        <props.icon size="16px" />
        {props.children}
      </Button>
    ),
    [],
  );

  return (
    <>
      <Select
        value={activeTeam.id}
        onValueChange={onValueChange}
        disabled={setActiveTeam.isPending}
        {...select}
      >
        <SelectTrigger
          className="h-8 w-[200px]"
          isLoading={setActiveTeam.isPending}
        >
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
            {actionButton({
              icon: CirclePlus,
              children: <>Create new</>,
              onClick: () => createTeamDialog.onOpenChange(true),
            })}
            {actionButton({
              icon: GitPullRequestArrow,
              children: <>Request join</>,
              onClick: () => requestJoinTeamDialog.onOpenChange(true),
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      <CreateTeamDialog {...createTeamDialog} />
      <RequestJoinTeamDialog {...requestJoinTeamDialog} />
    </>
  );
};

type ActionButtonProps = {
  children: ReactNode;
  icon: LucideIcon;
  onClick?: () => void;
};
