import React from "react";

import { TransactionHistory } from "@/app/(authed)/(history)/history/_components/transaction-history";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return (
    <div className="space-y-4 sm:space-y-6">
      <TransactionHistory team={team} />
    </div>
  );
};

export default Page;
