"use client";

import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import {
  InviteMemberForm,
  type Ref,
} from "@/app/(authed)/(teams)/teams/_forms/invite-member-form";
import { Button, ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { type TTeamDetailDto } from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  team: TTeamDetailDto;
};
export const InviteMemberButton = ({ team }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const ref = useRef<Ref>(null);

  const { isPending, mutate } = api.inviteJoinTeam.createInviteJoin.useMutation(
    {
      onSuccess: () => {
        router.refresh();
        toast({
          title: "Saved",
          variant: "successful",
        });
        setOpen(false);
      },
      onError: (err) => {
        toast({
          title: "Something went wrong",
          variant: "destructive",
          description: err.message,
        });
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full space-x-2 sm:w-1/4" size="sm">
          <UserPlus className="h-4 w-4" />
          <span>Invite new member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite new member</DialogTitle>
          <DialogDescription>Invite new member to join team.</DialogDescription>
        </DialogHeader>
        <Separator />

        <InviteMemberForm
          isPending={isPending}
          onSubmit={(value) =>
            mutate({
              ...value,
              teamId: team.id,
            })
          }
          ref={ref}
        />

        <DialogFooter>
          <ButtonLoading
            size="sm"
            isLoading={isPending}
            onClick={() => {
              ref.current?.submit();
            }}
          >
            Invite
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
