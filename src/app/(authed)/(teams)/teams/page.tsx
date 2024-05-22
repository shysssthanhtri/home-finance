import React from "react";

import { TeamInfo } from "@/app/(authed)/(teams)/teams/_components/team-info";
import { TeamMembers } from "@/app/(authed)/(teams)/teams/_components/team-members";
import { TeamMembersSp } from "@/app/(authed)/(teams)/teams/_components/team-members/team-members-sp";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return (
    <div className="space-y-4 sm:space-y-6">
      <TeamInfo team={team} />
      <TeamMembers members={team.members} team={team} />
      <TeamMembersSp members={team.members} team={team} />
    </div>
  );
};

export default Page;
