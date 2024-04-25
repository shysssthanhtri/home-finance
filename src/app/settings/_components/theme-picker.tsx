"use client";

import { useTheme } from "next-themes";
import React from "react";

import { ThemeThumbnail } from "@/app/settings/_components/theme-thumbnail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Theme } from "@/config/theme";

export const ThemePicker = () => {
  const { theme, setTheme } = useTheme();
  const themes = [Theme.LIGHT, Theme.DARK, Theme.SYSTEM];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6">
        {themes.map((item) => (
          <ThemeThumbnail
            key={item}
            theme={item}
            isActive={theme === item}
            onClick={() => setTheme(item)}
          />
        ))}
      </CardContent>
    </Card>
  );
};
