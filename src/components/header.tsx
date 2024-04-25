import React from "react";

import { UserButton } from "@/components/user-button";

export const Header = () => {
  return (
    <header className="top-0 z-30 flex h-14 w-full items-center border-b bg-background p-4">
      <div className="relative ml-auto flex items-center">
        <UserButton />
      </div>
    </header>
  );
};
