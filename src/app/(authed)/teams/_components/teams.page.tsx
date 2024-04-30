import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { TeamInfo } from "@/app/(authed)/teams/_components/team-info";
import TeamSelector from "@/app/(authed)/teams/_components/teams-selector";
import { Card } from "@/components/ui/card";

export const TeamsPage = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Teams" />
      <Card className="space-y-2 p-4 sm:space-y-4 sm:p-6">
        <TeamSelector />
        <TeamInfo />
      </Card>
    </div>
  );
};
