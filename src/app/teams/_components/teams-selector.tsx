"use client";

import {
  CirclePlus,
  GitPullRequestArrow,
  type LucideIcon,
  User,
} from "lucide-react";
import React, { type ReactNode, useCallback, useState } from "react";

import CreateTeamDialog from "@/app/teams/_components/create-team-dialog";
import { RequestJoinTeamDialog } from "@/app/teams/_components/request-join-team-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const TeamSelector = () => {
  const [selectedOption, setSelectedOption] = useState<string>(
    SelectActionOption.PERSONAL,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const renderSelectItem = useCallback(
    (value: string, label: ReactNode, extra?: { icon: LucideIcon }) => {
      return (
        <SelectItem value={value}>
          <span className="flex items-center gap-2">
            {extra && <extra.icon size="16px" />}
            {label}
          </span>
        </SelectItem>
      );
    },
    [],
  );

  const onValueChange = useCallback((value: string) => {
    if (
      Object.values(SelectActionOption).includes(value as SelectActionOption)
    ) {
      switch (value as SelectActionOption) {
        case SelectActionOption.CREATE:
          setIsCreateModalOpen(true);
          break;

        case SelectActionOption.JOIN:
          setIsRequestModalOpen(true);
          break;

        case SelectActionOption.PERSONAL:
          setSelectedOption(value);
          break;

        default:
          break;
      }
      return;
    }
    setSelectedOption(value);
  }, []);

  return (
    <>
      <Select value={selectedOption} onValueChange={onValueChange}>
        <div className="space-y-2">
          <span>Select your team:</span>
          <SelectTrigger className="w-full sm:w-96">
            <SelectValue placeholder="Your team" />
          </SelectTrigger>
        </div>
        <SelectContent>
          {renderSelectItem(SelectActionOption.PERSONAL, "Personal", {
            icon: User,
          })}
          {renderSelectItem(SelectActionOption.CREATE, "Create new", {
            icon: CirclePlus,
          })}
          {renderSelectItem(SelectActionOption.JOIN, "Request join", {
            icon: GitPullRequestArrow,
          })}
          <Separator className="my-1" />
          {renderSelectItem("team-1", "Team 1")}
          {renderSelectItem("team-2", "Team 2")}
        </SelectContent>
      </Select>
      <CreateTeamDialog
        open={isCreateModalOpen}
        close={() => setIsCreateModalOpen(false)}
      />
      <RequestJoinTeamDialog
        open={isRequestModalOpen}
        close={() => setIsRequestModalOpen(false)}
      />
    </>
  );
};

export default TeamSelector;

enum SelectActionOption {
  PERSONAL = "personal",
  CREATE = "create",
  JOIN = "join",
}
