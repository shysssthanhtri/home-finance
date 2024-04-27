import React from "react";

import { ThemePicker } from "@/app/settings/_components/theme-picker";
import { UserInfo } from "@/app/settings/_components/user-info";
import { SettingsTab } from "@/app/settings/_configs/tabs";
import { TabsContent } from "@/components/ui/tabs";

export const PersonalTab = () => {
  return (
    <TabsContent value={SettingsTab.PERSONAL} className="space-y-4">
      <UserInfo />
      <ThemePicker />
    </TabsContent>
  );
};
