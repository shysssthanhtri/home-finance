"use client";

import { useContext } from "react";

import { TeamContext } from "@/app/(authed)/_contexts/team.context";
import { api } from "@/trpc/react";

export const useTeamInfoControl = () => {
  const { team, user } = useContext(TeamContext);
  const { isLoading, data } = api.team.getTeam.useQuery(
    { id: team?.id ?? "" },
    {
      enabled: !!team,
    },
  );

  return {
    team: data,
    user,
    isLoading,
  };
};
