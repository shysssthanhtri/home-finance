import React from "react";

import { InviteMemberButton } from "@/app/(authed)/(teams)/teams/_components/invite-member-button";
import { TeamInfo } from "@/app/(authed)/(teams)/teams/_components/team-info";
import { MemberTable } from "@/app/(authed)/(teams)/teams/_components/team-members/member-table";
import { getCurrentUser } from "@/server/auth";
import { api } from "@/trpc/server";

const Page = async () => {
  const curUser = await getCurrentUser();
  const team = await api.team.getActiveTeam();
  const invites = await api.inviteJoinTeam.getInvitesByTeamId({ id: team.id });
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-x-4 gap-y-4 sm:flex-row sm:gap-x-6">
        <TeamInfo team={team} />
        <InviteMemberButton team={team} />
      </div>
      <MemberTable user={curUser} team={team} members={team.members} />
    </div>
  );
};

export default Page;
