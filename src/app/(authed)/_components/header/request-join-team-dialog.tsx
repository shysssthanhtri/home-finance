"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

import { JoinTeamRequestForm } from "@/app/(authed)/_components/header/forms/join-team-request-form";
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
export const RequestJoinTeamDialog = ({ open, onOpenChange }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const { isPending, mutate } =
    api.requestJoinTeam.createRequestJoin.useMutation({
      onSuccess: () => {
        onOpenChange?.(false);
        toast({
          title: "Sent",
          variant: "successful",
        });
        router.refresh();
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
          <DialogTitle>Request join team</DialogTitle>
          <DialogDescription>
            Request to join team with specific role.
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <JoinTeamRequestForm
          formRef={formRef}
          isPending={isPending}
          onSubmit={mutate}
        />

        <DialogFooter>
          <ButtonLoading
            type="submit"
            size="sm"
            isLoading={isPending}
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            Request
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
