import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";

export const UserButton = () => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="overflow-hidden rounded-full"
    >
      <Image
        src="/placeholder-user.jpg"
        width={36}
        height={36}
        alt="Avatar"
        className="overflow-hidden rounded-full"
      />
    </Button>
  );
};
