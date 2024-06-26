import React from "react";

import { Footer } from "@/app/(authed)/_components/footer";
import { Header } from "@/app/(authed)/_components/header";
import { SideBar } from "@/app/(authed)/_components/side-bar";

type Props = {
  children: React.ReactNode;
};
const PageLayout = async ({ children }: Props) => {
  return (
    <>
      <SideBar />
      <div className="flex max-h-screen min-h-screen w-full flex-col overflow-hidden bg-muted/40 sm:pl-14">
        <Header />
        <div className="container mx-auto max-h-[calc(100vh-2*theme(space.14))] grow overflow-auto p-4 sm:max-h-[calc(100vh-theme(space.14))] sm:p-6">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
