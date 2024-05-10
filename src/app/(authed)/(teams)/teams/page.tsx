import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { TeamInfo } from "@/app/(authed)/(teams)/teams/_components/team-info";
import { TeamMembers } from "@/app/(authed)/(teams)/teams/_components/team-members";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Teams" />
      <TeamInfo team={team} />
      <TeamMembers members={team.members} team={team} />
    </div>
  );
};

export default Page;
