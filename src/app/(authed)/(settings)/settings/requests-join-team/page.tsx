import React from "react";

import { Header } from "@/app/(authed)/(settings)/settings/_components/header";
import { RequestTable } from "@/app/(authed)/(settings)/settings/requests-join-team/_components/request-table/request-table";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

const Page = async () => {
  const requests = await api.requestJoinTeam.getMyRequests();
  return (
    <div className="w-full space-y-4">
      <Header
        title="Requests join team"
        description="Your requests to join other teams."
      />
      <Separator />
      <RequestTable requests={requests} />
    </div>
  );
};

export default Page;
