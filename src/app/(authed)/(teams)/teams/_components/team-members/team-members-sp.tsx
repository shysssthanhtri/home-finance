import React from "react";

import { MemberRoleBadge } from "@/app/(authed)/(teams)/teams/_components/team-members/member-role-badge";
import { RemoveMemberButton } from "@/app/(authed)/(teams)/teams/_components/team-members/remove-member-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { getCurrentUser } from "@/server/auth";

type Props = {
  team: TTeamEntity;
  members: TTeamDetailDto["members"];
};
export const TeamMembersSp = async ({ team, members }: Props) => {
  const curUser = await getCurrentUser();
  return (
    <Card className="block sm:hidden">
      <CardContent className="space-y-2 pt-4 sm:pt-6">
        {members.map((member, index) => {
          const isCurUser = curUser.id === member.id;
          const isTeamOwner = team.belongToUserId === member.id;
          return (
            <>
              <div className="flex justify-between">
                <div key={member.id} className="space-y-1">
                  <div className="space-x-2">
                    <span>{member.name}</span>
                    {isCurUser && <Badge className="h-4 text-xs">You</Badge>}
                  </div>
                  <div className="text-xs text-gray-400">{member.email}</div>
                  <MemberRoleBadge
                    teamId={team.id}
                    member={member}
                    disabled={isTeamOwner}
                  />
                </div>
                {!isTeamOwner && (
                  <RemoveMemberButton teamId={team.id} memberId={member.id} />
                )}
              </div>
              {index !== members.length - 1 && <Separator />}
            </>
          );
        })}
      </CardContent>
    </Card>
  );
};