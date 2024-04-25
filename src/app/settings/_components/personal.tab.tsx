import React from "react";

import { ThemeThumbnail } from "@/app/settings/_components/theme-thumbnail";
import { SettingsTab } from "@/app/settings/_configs/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

export const PersonalTab = () => {
  return (
    <TabsContent value={SettingsTab.PERSONAL}>
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-6">
          <ThemeThumbnail theme="light" isActive />
          <ThemeThumbnail theme="dark" />
          <ThemeThumbnail theme="system" />
        </CardContent>
      </Card>
    </TabsContent>
  );
};
