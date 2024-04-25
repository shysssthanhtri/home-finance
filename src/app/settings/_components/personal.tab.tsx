"use client";

import dynamic from "next/dynamic";
import React from "react";

import { SettingsTab } from "@/app/settings/_configs/tabs";
import { TabsContent } from "@/components/ui/tabs";

const ThemePicker = dynamic(
  async () =>
    (await import("@/app/settings/_components/theme-picker")).ThemePicker,
  {
    ssr: false,
  },
);

export const PersonalTab = () => {
  return (
    <TabsContent value={SettingsTab.PERSONAL}>
      <ThemePicker />
    </TabsContent>
  );
};
