"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

import { TeamForm } from "@/app/(authed)/_components/header/team-form";
import { ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};
export const CreateTeamDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const { isPending, mutate } = api.team.createTeam.useMutation({
    onSuccess: () => {
      router.refresh();
      onOpenChange?.(false);
    },
    onError: (err) => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: err.message,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Create a new team, to separate data from your personal.
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <TeamForm formRef={formRef} isPending={isPending} onSubmit={mutate} />

        <DialogFooter>
          <ButtonLoading type="submit" size="sm" isLoading={isPending}>
            Create
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
