"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";

import { TeamContext } from "@/app/(authed)/_contexts/team.context";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";

type Props = {
  user: TUserEntity;
  teams: TTeamEntity[];
  children: ReactNode;
};
export const TeamContextProvider = ({ user, teams, children }: Props) => {
  const personalTeam = useMemo(
    () => teams.find((t) => t.belongToUserId === user.id),
    [teams, user],
  );

  const [selectedTeam, setSelectedTeam] = useState<TTeamEntity>();

  useEffect(() => {
    if (!selectedTeam) {
      setSelectedTeam(personalTeam);
    }
  }, [personalTeam, selectedTeam]);

  return (
    <TeamContext.Provider
      value={{
        teams,
        user,

        team: selectedTeam,
        setTeam: setSelectedTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};
