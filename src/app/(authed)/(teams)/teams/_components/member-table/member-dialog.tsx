"use client";

import { type TeamMemberRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef } from "react";

import { RemoveMemberButton } from "@/app/(authed)/(teams)/teams/_components/member-table/remove-member-button";
import {
  MemberForm,
  type Ref,
} from "@/app/(authed)/(teams)/teams/_forms/member-form";
import { ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  type TTeamDetailDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

type Props = {
  team: TTeamEntity;
  member: TTeamDetailDto["members"][0];
  children: React.ReactNode;
};
export const MemberDialog = ({ team, member, children }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const ref = useRef<Ref>(null);

  const { mutate, isPending } = api.team.updateMemberRole.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        variant: "successful",
        title: "Saved",
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

  const onSubmit = useCallback(
    ({ role }: { role: TeamMemberRole }) => {
      mutate({ teamId: team.id, userId: member.id, role });
    },
    [member.id, mutate, team.id],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Member info</DialogTitle>
        </DialogHeader>
        <Separator />
        <MemberForm
          member={member}
          onSubmit={onSubmit}
          isPending={isPending}
          ref={ref}
        />
        <DialogFooter
          className={cn(
            "flex-row justify-end gap-x-2",
            team.belongToUserId === member.id && "hidden",
          )}
        >
          <RemoveMemberButton
            teamId={team.id}
            memberId={member.id}
            disabled={isPending}
          />
          <ButtonLoading
            size="sm"
            onClick={() => ref.current?.submit()}
            isLoading={isPending}
          >
            Save
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
