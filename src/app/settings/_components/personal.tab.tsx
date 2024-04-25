import React from "react";

import { SettingsTab } from "@/app/settings/_configs/tabs";
import { TabsContent } from "@/components/ui/tabs";

export const PersonalTab = () => {
  return (
    <TabsContent value={SettingsTab.PERSONAL}>
      Make changes to your account here PERSONAL.
    </TabsContent>
  );
};
