import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { Charts } from "@/app/(authed)/(analyst)/analyst/_components/charts";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Analyst" />
      <Charts team={team} />
    </div>
  );
};

export default Page;
