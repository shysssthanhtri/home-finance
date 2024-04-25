import React from "react";

import { SettingsTab } from "@/app/settings/_configs/tabs";
import { TabsContent } from "@/components/ui/tabs";

export const ProfilesTab = () => {
  return (
    <TabsContent value={SettingsTab.PROFILES}>
      Make changes to your account here PROFILES.
    </TabsContent>
  );
};
