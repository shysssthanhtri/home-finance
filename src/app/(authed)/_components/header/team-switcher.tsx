"use client";

import { CirclePlus, GitPullRequestArrow, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { type ReactNode } from "react";

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
import { useToast } from "@/components/ui/use-toast";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

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
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: setActiveTeam, isPending: isSettingActiveTeam } =
    api.team.setActiveTeam.useMutation({
      onSuccess: () => {
        router.refresh();
      },
      onError: (err) => {
        toast({
          title: "Something went wrong",
          variant: "destructive",
          description: err.message,
        });
      },
    });

  const label = (child: ReactNode) => (
    <SelectLabel className="text-xs text-gray-400">{child}</SelectLabel>
  );

  const onValueChange = async (newActiveTeam: TTeamEntity["id"]) => {
    setActiveTeam({
      id: newActiveTeam,
    });
  };

  return (
    <Select
      value={activeTeam.id}
      onValueChange={onValueChange}
      disabled={isSettingActiveTeam}
    >
      <SelectTrigger className="w-[200px]">
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
  );
};
