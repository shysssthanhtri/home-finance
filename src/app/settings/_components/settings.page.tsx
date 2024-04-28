import React from "react";

import { ThemePicker } from "@/app/settings/_components/theme-picker";
import { UserInfo } from "@/app/settings/_components/user-info";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";

export const SettingsPage = () => {
  return (
    <div className="hidden space-y-6 sm:block">
      <PageTitle title="Settings" />
      <Card className="pt-6">
        <CardContent className="space-y-4">
          <UserInfo />
          <ThemePicker />
        </CardContent>
      </Card>
    </div>
  );
};
