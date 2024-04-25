import React from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { SideBar } from "@/components/side-bar";

type Props = {
  children: React.ReactNode;
};
const PageLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar />
      <div className="min-h-screen grow bg-muted/40 sm:pl-14">
        <Header />
        <div className="p-4">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
