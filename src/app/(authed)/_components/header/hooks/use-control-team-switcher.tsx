import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";

export const useControlTeamSwitcher = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isCreateTeamDialogOpen, _setIsCreateTeamDialogOpen] = useState(false);
  const [isRequestJoinTeamDialogOpen, _setIsRequestJoinTeamDialogOpen] =
    useState(false);

  const { mutate, isPending } = api.team.setActiveTeam.useMutation({
    onSuccess: () => {
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

  const setIsCreateTeamDialogOpen = useCallback(
    (flag: boolean) => {
      setIsSelectOpen(false);
      _setIsCreateTeamDialogOpen(flag);
    },
    [_setIsCreateTeamDialogOpen],
  );

  const setIsRequestJoinTeamDialogOpen = useCallback(
    (flag: boolean) => {
      setIsSelectOpen(false);
      _setIsRequestJoinTeamDialogOpen(flag);
    },
    [_setIsRequestJoinTeamDialogOpen],
  );

  return {
    select: {
      open: isSelectOpen,
      onOpenChange: setIsSelectOpen,
    },
    createTeamDialog: {
      open: isCreateTeamDialogOpen,
      onOpenChange: setIsCreateTeamDialogOpen,
    },
    requestJoinTeamDialog: {
      open: isRequestJoinTeamDialogOpen,
      onOpenChange: setIsRequestJoinTeamDialogOpen,
    },
    setActiveTeam: {
      isPending,
      mutate,
    },
  };
};
