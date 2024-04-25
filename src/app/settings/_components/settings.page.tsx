import React from "react";

import { PersonalTab } from "@/app/settings/_components/personal.tab";
import { ProfilesTab } from "@/app/settings/_components/profiles.tab";
import { SettingsTab, settingsTabs } from "@/app/settings/_configs/tabs";
import { PageTitle } from "@/components/page-title";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const SettingsPage = () => {
  return (
    <div className="hidden space-y-6 sm:block">
      <PageTitle title="Settings" />
      <Card className="pt-6">
        <CardContent className="">
          <Tabs defaultValue={SettingsTab.PERSONAL}>
            <TabsList className="mb-4">
              {settingsTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            <PersonalTab />
            <ProfilesTab />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
