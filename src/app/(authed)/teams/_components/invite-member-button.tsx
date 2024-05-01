import { UserRoundPlus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

export const InviteMemberButton = () => {
  return (
    <Button className="space-x-2" size="sm">
      <UserRoundPlus />
      <span className="hidden sm:block">Invite member</span>
    </Button>
  );
};
