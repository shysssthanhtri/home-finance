import React from "react";

import { NotificationButton } from "@/app/(authed)/_components/header/notification-button";
import { TeamSwitcher } from "@/app/(authed)/_components/header/team-switcher";
import { UserButton } from "@/app/(authed)/_components/header/user-button";
import { getCurrentUser } from "@/server/auth";
import { api } from "@/trpc/server";

export const Header = async () => {
  const curUser = await getCurrentUser();

  const [activeTeam, _teams] = await Promise.all([
    api.team.getActiveTeam(),
    api.team.getTeams(),
  ]);

  const personalTeam = _teams.find((t) => t.belongToUserId === curUser.id);
  const joinedTeams = _teams.filter((t) => t.belongToUserId !== curUser.id);

  return (
    <header className="flex h-14 w-full items-center border-b bg-background p-4">
      <div className="flex w-full items-center justify-between">
        <TeamSwitcher
          activeTeam={activeTeam}
          personalTeam={personalTeam}
          joinedTeams={joinedTeams}
        />
        <div className="flex items-center gap-x-4">
          <NotificationButton />
          <UserButton />
        </div>
      </div>
    </header>
  );
};
