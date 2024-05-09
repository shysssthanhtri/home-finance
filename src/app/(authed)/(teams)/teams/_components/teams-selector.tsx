"use client";

import {
  CirclePlus,
  GitPullRequestArrow,
  type LucideIcon,
  User,
} from "lucide-react";
import React, {
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { TeamContext } from "@/app/(authed)/_contexts/team.context";
import CreateTeamDialog from "@/app/(authed)/(teams)/teams/_components/create-team-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const TeamSelector = () => {
  const { teams, team, user, setTeam } = useContext(TeamContext);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const renderSelectItem = useCallback(
    (value: string, label: ReactNode, extra?: { icon: LucideIcon }) => {
      return (
        <SelectItem value={value} key={value}>
          <span className="flex items-center gap-2">
            {extra && <extra.icon size="16px" />}
            {label}
          </span>
        </SelectItem>
      );
    },
    [],
  );

  const onValueChange = useCallback(
    (value: string) => {
      if (
        Object.values(SelectActionOption).includes(value as SelectActionOption)
      ) {
        switch (value as SelectActionOption) {
          case SelectActionOption.CREATE:
            setIsCreateModalOpen(true);
            return;
        }
      }
      setTeam(teams.find((t) => t.id === value));
    },
    [teams, setTeam],
  );

  const options = useMemo(() => {
    const result: ReactNode[] = [];

    const personalTeam = teams.find((t) => t.belongToUserId === user?.id);
    if (personalTeam) {
      result.push(
        renderSelectItem(personalTeam.id, personalTeam.name, {
          icon: User,
        }),
      );
    }

    result.push(
      renderSelectItem(SelectActionOption.CREATE, "Create new", {
        icon: CirclePlus,
      }),
    );
    result.push(
      renderSelectItem(SelectActionOption.JOIN, "Request join", {
        icon: GitPullRequestArrow,
      }),
    );

    result.push(<Separator key="separator" />);

    teams
      .filter((t) => t.id !== personalTeam?.id)
      .forEach((t) => {
        result.push(renderSelectItem(t.id, t.name));
      });

    return result;
  }, [user?.id, renderSelectItem, teams]);

  return (
    <>
      <Select value={team?.id} onValueChange={onValueChange}>
        <div className="space-y-2">
          <span>Select your team:</span>
          <SelectTrigger className="w-full sm:w-96">
            <SelectValue placeholder="Your team" />
          </SelectTrigger>
        </div>
        <SelectContent>{options}</SelectContent>
      </Select>
      <CreateTeamDialog
        open={isCreateModalOpen}
        close={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default TeamSelector;

enum SelectActionOption {
  CREATE = "create",
  JOIN = "join",
}
