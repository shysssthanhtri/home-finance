"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { AlertWrapper } from "@/components/alert-wrapper";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  teamId: TTeamEntity["id"];
  memberId: TTeamDetailDto["members"][0]["id"];
  disabled?: boolean;
};
export const RemoveMemberButton = ({ teamId, memberId, disabled }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = api.team.removeMember.useMutation({
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
          userId: memberId,
        })
      }
    >
      <Button variant="destructive" size="sm" disabled={disabled}>
        Remove
      </Button>
    </AlertWrapper>
  );
};
