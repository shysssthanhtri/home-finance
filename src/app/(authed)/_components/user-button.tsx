import Link from "next/link";
import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppRoute } from "@/config/app-route";
import { getCurrentUser } from "@/server/auth";

export const UserButton = async () => {
  const user = await getCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={user.image ?? ""} />
            <AvatarFallback>N/A</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="w-full" href={AppRoute.settings}>
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="w-full" href={AppRoute.signOut}>
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
