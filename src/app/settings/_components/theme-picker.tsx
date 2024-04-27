"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import React from "react";

import { ThemeThumbnail } from "@/app/settings/_components/theme-thumbnail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Theme } from "@/config/theme";

const ThemeThumbnailDynamic = dynamic(
  async () =>
    (await import("@/app/settings/_components/theme-thumbnail")).ThemeThumbnail,
  {
    ssr: false,
    loading: () => <ThemeThumbnail theme={Theme.LIGHT} />,
  },
);

export const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const themes = [Theme.LIGHT, Theme.DARK, Theme.SYSTEM];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6">
        {themes.map((item) => {
          if (item === Theme.SYSTEM) {
            return (
              <ThemeThumbnailDynamic
                key={item}
                theme={item}
                isActive={theme === item}
                onClick={() => setTheme(item)}
              />
            );
          }
          return (
            <ThemeThumbnail
              key={item}
              theme={item}
              isActive={theme === item}
              onClick={() => setTheme(item)}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};
