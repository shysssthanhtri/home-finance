import Link from "next/link";
import React from "react";

import { menuItems } from "@/config/menu";

export const Footer = () => {
  return (
    <nav className="flex h-14 w-full items-center justify-around border-t bg-background p-4 sm:hidden">
      {menuItems.map((item) => (
        <Link key={item.title} href={item.href}>
          <item.icon className="h-5 w-5" />
          <span className="sr-only">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};