import React from "react";

import { Footer } from "@/app/(authed)/_components/footer";
import { Header } from "@/app/(authed)/_components/header";
import { SideBar } from "@/components/side-bar";

type Props = {
  children: React.ReactNode;
};
const PageLayout = ({ children }: Props) => {
  return (
    <div>
      <SideBar />
      <div className="flex max-h-screen min-h-screen w-full flex-col overflow-hidden sm:pl-14">
        <Header />
        <div className="max-h-[calc(100vh-2*theme(space.14))] grow overflow-auto p-4 sm:max-h-[calc(100vh-theme(space.14))] sm:p-6">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
