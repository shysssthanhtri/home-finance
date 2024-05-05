import { Settings } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

export const EditTeamInfoButton = () => {
  return (
    <Button className="w-full space-x-2 sm:w-fit" size="sm" variant="outline">
      <Settings />
      <span className="hidden sm:block">Edit info</span>
    </Button>
  );
};
