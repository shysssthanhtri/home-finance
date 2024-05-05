"use client";

import { useTheme } from "next-themes";
import React from "react";

import { ThemeThumbnail } from "@/app/(authed)/(settings)/settings/_components/theme-thumbnail";
import { CollapsibleCard } from "@/components/collapsible-card";
import { Theme } from "@/config/theme";

export const ThemePicker = () => {
  const { setTheme } = useTheme();
  const themes = [Theme.LIGHT, Theme.DARK, Theme.SYSTEM];

  return (
    <CollapsibleCard
      title="Theme"
      contentClassName="flex gap-4 overflow-x-auto sm:gap-6 sm:overflow-visible"
    >
      {themes.map((item) => {
        return (
          <ThemeThumbnail
            key={item}
            theme={item}
            onClick={() => setTheme(item)}
          />
        );
      })}
    </CollapsibleCard>
  );
};
