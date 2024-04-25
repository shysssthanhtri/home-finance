import React from "react";

import { UserButton } from "@/components/user-button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background p-4 sm:static">
      <div className="relative ml-auto flex items-center">
        <UserButton />
      </div>
    </header>
  );
};
