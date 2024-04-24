import Link from "next/link";
import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { menuItems } from "@/config/menu";

type Props = {
  children: React.ReactNode;
};
export const SheetMenu = ({ children }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
