"use client";

import React, { type ReactNode, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  text: string;
  children: ReactNode;
};
export const CopyButton = ({ children, text }: Props) => {
  const { toast } = useToast();

  const copyToClipboard = useCallback(async () => {
    const func =
      "clipboard" in navigator
        ? () => navigator.clipboard.writeText(text)
        : () => document.execCommand("copy", true, text);

    await func();
    toast({
      title: "Copied",
      duration: 1000,
    });
  }, [text, toast]);

  return (
    <Button
      variant="outline"
      onClick={copyToClipboard}
      className="h-fit w-fit p-0 px-1"
      type="button"
    >
      {children}
    </Button>
  );
};
