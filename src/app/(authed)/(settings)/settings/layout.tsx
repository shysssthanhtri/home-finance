import React from "react";

import { SettingsSideBar } from "@/app/(authed)/(settings)/settings/_components/settings-side-bar";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-row gap-x-8">
      <SettingsSideBar />

      {children}
    </div>
  );
};

export default Layout;
