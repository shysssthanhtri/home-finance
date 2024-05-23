"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
};
export const CancelRequestButton = ({ teamId, memberId }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = api.requestJoinTeam.rejectMyRequest.useMutation(
    {
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
    },
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Cancel</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>No</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() =>
              mutate({
                teamId,
                userId: memberId,
              })
            }
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
