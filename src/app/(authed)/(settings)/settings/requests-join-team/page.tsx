import React from "react";

import { RequestTable } from "@/app/(authed)/(settings)/settings/requests-join-team/_components/request-table/request-table";
import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

const Page = async () => {
  const requests = await api.requestJoinTeam.getMyRequests();
  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-lg font-medium">Requests join team</h3>
        <p className="text-sm text-muted-foreground">
          Your requests to join other teams.
        </p>
      </div>
      <Separator />
      <RequestTable requests={requests} />
    </div>
  );
};

export default Page;
