"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { AlertWrapper } from "@/components/alert-wrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { api } from "@/trpc/react";

type Props = {
  teamId: TTeamEntity["id"];
  userId: TUserEntity["id"];
};
export const CancelInviteButton = ({ teamId, userId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = api.inviteJoinTeam.cancelInvite.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        variant: "successful",
        title: "Done",
      });
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: err.message,
      });
    },
  });

  return (
    <AlertWrapper
      loading={isPending}
      onYes={() =>
        mutate({
          teamId,
          userId,
        })
      }
    >
      <Button variant="destructive" size="sm">
        Cancel invite
      </Button>
    </AlertWrapper>
  );
};
