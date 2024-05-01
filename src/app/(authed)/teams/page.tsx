import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { TeamInfo } from "@/app/(authed)/teams/_components/team-info";
import TeamSelector from "@/app/(authed)/teams/_components/teams-selector";
import { Card } from "@/components/ui/card";
import { getCurrentUser } from "@/server/auth";
import { api } from "@/trpc/server";

const Page = async () => {
  const teams = await api.team.getTeams();
  const user = await getCurrentUser();
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Teams" />
      <Card className="space-y-4 bg-background p-4 sm:space-y-6 sm:p-6">
        <TeamSelector teams={teams} currentUser={user} />
        <TeamInfo />
      </Card>
    </div>
  );
};

export default Page;
