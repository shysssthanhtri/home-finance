"use client";

import { useTheme } from "next-themes";
import React from "react";

import { ThemeThumbnail } from "@/app/(authed)/(settings)/settings/themes/_components/theme-picker/theme-thumbnail";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Theme } from "@/config/theme";

export const ThemePicker = () => {
  const { setTheme } = useTheme();
  const themes = [Theme.LIGHT, Theme.DARK, Theme.SYSTEM];

  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {themes.map((item) => {
          return (
            <ThemeThumbnail
              key={item}
              theme={item}
              onClick={() => setTheme(item)}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
