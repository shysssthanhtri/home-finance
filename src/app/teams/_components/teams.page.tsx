import React from "react";

import { TeamInfo } from "@/app/teams/_components/team-info";
import TeamSelector from "@/app/teams/_components/teams-selector";
import { PageTitle } from "@/components/page-title";
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
