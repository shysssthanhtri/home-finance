import { Bell, BellDot, CircleOff } from "lucide-react";
import React, { type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const requestJoinTeams = await api.requestJoinTeam.getRequests({
    id: activeTeam.id,
  });
  requestJoinTeams.forEach((request) =>
    notifications.push(
      <Card>
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">
            {request.userName} want to join.
          </CardTitle>
          <CardDescription className="space-x-2 text-right">
            <Button className="h-8 w-10" variant="outline">
              No
            </Button>
            <Button className="h-8 w-10">Yes</Button>
          </CardDescription>
        </CardHeader>
      </Card>,
    ),
  );

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
