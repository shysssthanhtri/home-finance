import React from "react";

import { InviteMemberButton } from "@/app/(authed)/(teams)/teams/_components/invite-member-button";
import { TeamInfo } from "@/app/(authed)/(teams)/teams/_components/team-info";
import {
  TeamMembers,
  TeamMembersSp,
} from "@/app/(authed)/(teams)/teams/_components/team-members";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-x-4 gap-y-4 sm:flex-row sm:gap-x-6">
        <TeamInfo team={team} />
        <InviteMemberButton team={team} />
      </div>
      <TeamMembers members={team.members} team={team} />
      <TeamMembersSp members={team.members} team={team} />
    </div>
  );
};

export default Page;
