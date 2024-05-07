import { CircleX, Loader2 } from "lucide-react";
import React, { useCallback } from "react";

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
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { api } from "@/trpc/react";

type Props = {
  teamId: TTeamEntity["id"];
  userId: TUserEntity["id"];
};
export const RemoveMemberAlert = ({ teamId, userId }: Props) => {
  const { toast } = useToast();
  const utils = api.useUtils();
  const { mutate, isPending } = api.team.removeMember.useMutation({
    onSuccess: async () => {
      toast({
        title: "Removed",
        variant: "successful",
      });

      void utils.team.getTeam.refetch({ id: teamId });
    },
    onError: (err) => {
      toast({
        title: "Something wrong",
        variant: "destructive",
        description: err.message,
      });
    },
  });

  const onContinue = useCallback(() => {
    mutate({ userId, id: teamId });
  }, [teamId, userId, mutate]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <CircleX />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onContinue}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
