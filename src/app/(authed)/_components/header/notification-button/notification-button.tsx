import { Bell, BellDot, CircleOff } from "lucide-react";
import React, { type ReactNode } from "react";

import { getRequestJoinTeamNotifications } from "@/app/(authed)/_components/header/notification-button/get-request-join-team-notification";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

export const NotificationButton = async () => {
  const notifications: ReactNode[] = [];

  const activeTeam = await api.team.getActiveTeam();

  const requestJoinTeams = await getRequestJoinTeamNotifications(activeTeam.id);
  notifications.push(...requestJoinTeams);

  const hasNotification = !!notifications.length;

  const emptyContent = (
    <div className="flex h-full items-center justify-center">
      <span className="flex gap-x-2">
        <CircleOff /> Empty for now
      </span>
    </div>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "overflow-hidden rounded-full",
            hasNotification && "border-primary",
          )}
        >
          {hasNotification && <BellDot size={22} />}
          {!hasNotification && <Bell size={22} />}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px]">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left">Your notifications</SheetTitle>
          <Separator />
        </SheetHeader>
        {!hasNotification && emptyContent}
        {notifications}
      </SheetContent>
    </Sheet>
  );
};
