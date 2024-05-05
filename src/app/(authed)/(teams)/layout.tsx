import React, { type ReactNode } from "react";

import { TeamContextProvider } from "@/app/(authed)/_contexts/team.provider";
import { getCurrentUser } from "@/server/auth";
import { api } from "@/trpc/server";

type Props = {
  children: ReactNode;
};
const Layout = async ({ children }: Props) => {
  const teams = await api.team.getTeams();
  const user = await getCurrentUser();

  return (
    <TeamContextProvider teams={teams} user={user}>
      {children}
    </TeamContextProvider>
  );
};

export default Layout;
