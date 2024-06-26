"use client";

import { useTheme } from "next-themes";
import React, { useCallback, useMemo } from "react";

import { Theme, ThemeLabel } from "@/config/theme";
import { cn } from "@/lib/utils";

type Props = {
  theme: Theme;
  className?: string;
  onClick?: () => void;
};
export const ThemeThumbnail = (props: Props) => {
  const { theme, className, onClick } = props;
  const { systemTheme, theme: activeTheme } = useTheme();

  const isActive = useMemo(() => activeTheme === theme, [activeTheme, theme]);

  const genColor = useCallback((theme: Props["theme"]) => {
    if (theme === Theme.LIGHT) {
      return {
        1: "bg-[#ecedef]",
        2: "bg-white",
        3: "bg-[#ecedef]",
        4: "bg-[#ecedef]",
        5: "bg-white",
        6: "bg-[#ecedef]",
        7: "bg-[#ecedef]",
        8: "bg-white",
        9: "bg-[#ecedef]",
        10: "bg-[#ecedef]",
      };
    }
    return {
      1: "bg-slate-950",
      2: "bg-slate-800",
      3: "bg-slate-400",
      4: "bg-slate-400",
      5: "bg-slate-800",
      6: "bg-slate-400",
      7: "bg-slate-400",
      8: "bg-slate-800",
      9: "bg-slate-400",
      10: "bg-slate-400",
    };
  }, []);

  const color = useMemo(() => {
    if (theme === Theme.LIGHT) return genColor(Theme.LIGHT);
    if (theme === Theme.DARK) return genColor(Theme.DARK);
    if (systemTheme === "dark") return genColor(Theme.DARK);
    return genColor(Theme.LIGHT);
  }, [theme, genColor, systemTheme]);

  return (
    <button
      className={cn(
        "w-[200px] min-w-[200px] cursor-pointer p-1 duration-300 sm:p-2 sm:hover:scale-110",
        isActive && "rounded-lg border-2 border-primary",
        className,
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "items-center rounded-md border-2 border-muted p-1 hover:border-accent",
        )}
      >
        <div className={cn("space-y-2 rounded-sm p-2", color[1])}>
          <div className={cn("space-y-2 rounded-md p-2 shadow-sm", color[2])}>
            <div className={cn("h-2 w-3/5 rounded-lg", color[3])} />
            <div className={cn("h-2 w-4/5 rounded-lg", color[4])} />
          </div>
          <div
            className={cn(
              "flex items-center space-x-2 rounded-md p-2 shadow-sm",
              color[5],
            )}
          >
            <div className={cn("h-4 w-4 rounded-full", color[6])} />
            <div className={cn("h-2 w-full rounded-lg", color[7])} />
          </div>
          <div
            className={cn(
              "flex items-center space-x-2 rounded-md p-2 shadow-sm",
              color[8],
            )}
          >
            <div className={cn("h-4 w-4 rounded-full", color[9])} />
            <div className={cn("h-2 w-full rounded-lg", color[10])} />
          </div>
        </div>
      </div>
      <span className="block w-full p-2 text-center font-normal">
        {ThemeLabel[theme]}
      </span>
    </button>
  );
};
