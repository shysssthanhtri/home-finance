"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { settingsTabs } from "@/app/(authed)/(settings)/settings/_configs/tabs";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export const SettingsSideBar = (props: Props) => {
  const { className } = props;
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-row sm:w-[250px] sm:flex-col", className)}>
      {settingsTabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === tab.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start text-xs sm:text-sm",
          )}
        >
          {tab.title}
        </Link>
      ))}
    </nav>
  );
};
