import React from "react";

import { PageTitle } from "@/app/(authed)/_components/page-title";
import { ThemePicker } from "@/app/(authed)/settings/_components/theme-picker";
import { UserInfo } from "@/app/(authed)/settings/_components/user-info";
import { Card, CardContent } from "@/components/ui/card";

export const SettingsPage = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle title="Settings" />
      <Card>
        <CardContent className="space-y-4 pt-4 sm:space-y-6 sm:pt-6">
          <UserInfo />
          <ThemePicker />
        </CardContent>
      </Card>
    </div>
  );
};
