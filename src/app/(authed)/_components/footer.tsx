"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { menuItems } from "@/config/menu";
import { cn } from "@/lib/utils";

export const Footer = () => {
  const pathName = usePathname();
  return (
    <nav className="flex h-14 w-full items-center justify-around border-t bg-background p-4 sm:hidden">
      {menuItems.map((item) => {
        const isActive = pathName === item.href;
        return (
          <Link
            key={item.title}
            href={item.href}
            className={cn(
              "text-muted-foreground",
              isActive && "text-foreground",
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="sr-only">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};
