"use client";

import React, { useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type TTeamEntity } from "@/domain/entities/team.entity";

type Props = {
  id: TTeamEntity["id"];
};
export const TeamIdBadge = ({ id }: Props) => {
  const { toast } = useToast();
  const copyToClipboard = useCallback(async () => {
    const func =
      "clipboard" in navigator
        ? () => navigator.clipboard.writeText(id)
        : () => document.execCommand("copy", true, id);

    await func();
    toast({
      title: "Copied",
      duration: 1000,
    });
  }, [id, toast]);

  return (
    <>
      <Button variant="ghost" onClick={copyToClipboard}>
        <Badge variant="outline" className="hidden sm:block">
          id: {id}
        </Badge>
        <Badge variant="outline" className="block sm:hidden">
          Copy id
        </Badge>
      </Button>
    </>
  );
};
