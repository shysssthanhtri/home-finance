import React from "react";

import { InviteMemberButton } from "@/app/(authed)/(teams)/teams/_components/invite-member-button";
import { InviteTable } from "@/app/(authed)/(teams)/teams/_components/invite-table";
import { TeamInfo } from "@/app/(authed)/(teams)/teams/_components/team-info";
import {
  TeamMembers,
  TeamMembersSp,
} from "@/app/(authed)/(teams)/teams/_components/team-members";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  const invites = await api.inviteJoinTeam.getInvitesByTeamId({ id: team.id });
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-x-4 gap-y-4 sm:flex-row sm:gap-x-6">
        <TeamInfo team={team} />
        <InviteMemberButton team={team} />
      </div>
      <TeamMembers members={team.members} team={team} />
      <TeamMembersSp members={team.members} team={team} />
      {!!invites.length && <InviteTable invites={invites} />}
    </div>
  );
};

export default Page;
