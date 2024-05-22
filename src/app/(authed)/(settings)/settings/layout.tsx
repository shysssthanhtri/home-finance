import React from "react";

import { SettingsSideBar } from "@/app/(authed)/(settings)/settings/_components/settings-side-bar";
import { Separator } from "@/components/ui/separator";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-x-8 gap-y-4 sm:flex-row">
      <SettingsSideBar />
      <Separator className="sm:hidden" />
      {children}
    </div>
  );
};

export default Layout;
