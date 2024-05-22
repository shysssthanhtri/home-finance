"use client";

import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { type TInviteJoinTeamInfoDto } from "@/domain/dtos/team/invite-join-team-info.dto";
import { api as clientApi } from "@/trpc/react";

type Props = {
  invite: TInviteJoinTeamInfoDto;
};
export const InviteJoinTeamNotification = ({ invite }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: acceptRequest, isPending: isAcceptingRequest } =
    clientApi.inviteJoinTeam.acceptInvite.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({
          variant: "successful",
          title: "Accepted",
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

  const { mutate: rejectRequest, isPending: isRejectingRequest } =
    clientApi.inviteJoinTeam.rejectInvite.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({
          variant: "successful",
          title: "Rejected",
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

  const isDisabled = useMemo(
    () => isAcceptingRequest || isRejectingRequest,
    [isAcceptingRequest, isRejectingRequest],
  );

  return (
    <Card>
      <CardHeader className="space-y-2 p-2 sm:p-4">
        <CardTitle className="text-xs sm:text-sm">
          You are invited to join the team {invite.teamName}
        </CardTitle>
        <CardDescription className="space-x-2 text-right">
          <Button
            className="h-6 w-6 text-xs"
            variant="outline"
            disabled={isDisabled}
            onClick={() => rejectRequest({ teamId: invite.teamId })}
          >
            No
          </Button>
          <Button
            className="h-6 w-6 text-xs"
            disabled={isDisabled}
            onClick={() => acceptRequest({ teamId: invite.teamId })}
          >
            Yes
          </Button>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
