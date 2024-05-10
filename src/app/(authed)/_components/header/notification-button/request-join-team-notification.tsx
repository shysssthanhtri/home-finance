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
import { type TRequestJoinTeamInfoDto } from "@/domain/dtos/team";
import { api as clientApi } from "@/trpc/react";

type Props = {
  request: TRequestJoinTeamInfoDto;
};
export const RequestJoinTeamNotification = ({ request }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate: acceptRequest, isPending: isAcceptingRequest } =
    clientApi.requestJoinTeam.acceptRequest.useMutation({
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

  const isDisabled = useMemo(() => isAcceptingRequest, [isAcceptingRequest]);

  return (
    <Card>
      <CardHeader className="space-y-2 p-2 sm:p-4">
        <CardTitle className="text-xs sm:text-sm">
          {request.userName} want to join.
        </CardTitle>
        <CardDescription className="space-x-2 text-right">
          <Button
            className="h-6 w-6 text-xs"
            variant="outline"
            disabled={isDisabled}
          >
            No
          </Button>
          <Button
            className="h-6 w-6 text-xs"
            disabled={isDisabled}
            onClick={() =>
              acceptRequest({ teamId: request.teamId, userId: request.userId })
            }
          >
            Yes
          </Button>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
