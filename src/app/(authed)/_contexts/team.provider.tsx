"use client";

import { type ReactNode, useMemo } from "react";

import { TeamContext } from "@/app/(authed)/_contexts/team.context";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";

type Props = {
  user: TUserEntity;
  teams: TTeamEntity[];
  children: ReactNode;
};
export const TeamContextProvider = ({ user, teams, children }: Props) => {
  const selectedTeam = useMemo(
    () => teams.find((t) => t.belongToUserId === user.id),
    [teams, user],
  );
  return (
    <TeamContext.Provider
      value={{
        teams,
        team: selectedTeam,
        user,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
