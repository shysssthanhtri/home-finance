import React from "react";

import { SettingsSideBar } from "@/app/(authed)/(settings)/settings/_components/settings-side-bar";

type Props = {
  children: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-row gap-x-4">
      <SettingsSideBar />

      <div>{children}</div>
    </div>
  );
};

export default Layout;
