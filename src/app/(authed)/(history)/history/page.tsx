import React from "react";

import { TransactionHistory } from "@/app/(authed)/(history)/history/_components/transaction-history";
import { api } from "@/trpc/server";

const Page = async () => {
  const team = await api.team.getActiveTeam();
  return <TransactionHistory team={team} />;
};

export default Page;
