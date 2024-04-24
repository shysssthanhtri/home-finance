import { PanelLeft } from "lucide-react";
import React from "react";

import { SheetMenu } from "@/components/sheet-menu";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/user-button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b px-4 sm:static">
      <SheetMenu>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetMenu>
      <div className="relative ml-auto flex items-center">
        <UserButton />
      </div>
    </header>
  );
};
