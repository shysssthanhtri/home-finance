"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

import { TeamInfoForm } from "@/app/(authed)/(teams)/teams/_forms/team-info-form";
import { ButtonLoading } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api as apiClient } from "@/trpc/react";

type Props = {
  team: TTeamEntity;
};
export const TeamInfo = ({ team }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate, isPending } = apiClient.team.updateTeam.useMutation({
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

  return (
    <Card className={"flex-grow pt-4"}>
      <CardContent>
        <TeamInfoForm
          team={team}
          onSubmit={mutate}
          isPending={isPending}
          formRef={formRef}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <ButtonLoading
          type="submit"
          size="sm"
          isLoading={isPending}
          onClick={() => {
            formRef.current?.requestSubmit();
          }}
        >
          Save
        </ButtonLoading>
      </CardFooter>
    </Card>
  );
};
