import { Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AppRoute } from "@/config/app-route";
import { menuItems } from "@/config/menu";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export const SideBar = ({ className }: Props) => {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex",
        className,
      )}
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={AppRoute.home}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Home Finance</span>
        </Link>

        {menuItems.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
    </aside>
  );
};
