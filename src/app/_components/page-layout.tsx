import React from "react";

import { Footer } from "@/app/_components/footer";
import { Header } from "@/app/_components/header";
import { SideBar } from "@/components/side-bar";

type Props = {
  children: React.ReactNode;
};
const PageLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <div className="max-h-full min-h-screen grow overflow-hidden bg-muted/40 sm:pl-14">
        <Header />
        <div className="max-h-[calc(100vh-theme(space.14))] overflow-auto p-4">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
