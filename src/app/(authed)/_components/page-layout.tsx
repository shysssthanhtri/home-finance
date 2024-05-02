import React from "react";

import { Footer } from "@/app/(authed)/_components/footer";
import { Header } from "@/app/(authed)/_components/header";
import { SideBar } from "@/app/(authed)/_components/side-bar";
import { TeamContextProvider } from "@/app/(authed)/_contexts/team.provider";
import { getCurrentUser } from "@/server/auth";
import { api } from "@/trpc/server";

type Props = {
  children: React.ReactNode;
};
const PageLayout = async ({ children }: Props) => {
  const teams = await api.team.getTeams();
  const user = await getCurrentUser();
  return (
    <TeamContextProvider teams={teams} user={user}>
      <SideBar />
      <div className="flex max-h-screen min-h-screen w-full flex-col overflow-hidden sm:pl-14">
        <Header />
        <div className="max-h-[calc(100vh-2*theme(space.14))] grow overflow-auto p-4 sm:max-h-[calc(100vh-theme(space.14))] sm:p-6">
          {children}
        </div>
        <Footer />
      </div>
    </TeamContextProvider>
  );
};

export default PageLayout;
