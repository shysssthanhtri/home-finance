"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

import {
  UserInfoForm,
  type UserInfoFormRef,
} from "@/app/(authed)/(settings)/settings/_forms/user-info-form";
import { Button, ButtonLoading } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { type TUserEntity } from "@/domain/entities/user.entity";
import { api } from "@/trpc/react";

type Props = {
  user: TUserEntity;
};
export const UserInfoSection = ({ user }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const ref = useRef<UserInfoFormRef>(null);

  const { isPending, mutate } = api.user.updateUser.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Saved",
        variant: "successful",
      });
    },
    onError: (err) => {
      toast({
        title: "Something went wrong",
        variant: "destructive",
        description: err.message,
      });
    },
  });

  return (
    <div className="space-y-4">
      <UserInfoForm
        user={user}
        isPending={isPending}
        onSubmit={mutate}
        ref={ref}
      />
      <div className="flex justify-end gap-x-4">
        <Button
          size="sm"
          variant="outline"
          disabled={isPending}
          onClick={() => {
            ref.current?.reset();
          }}
        >
          Discard
        </Button>
        <ButtonLoading
          size="sm"
          isLoading={isPending}
          onClick={() => {
            // formRef.current?.requestSubmit();
            ref.current?.submit();
          }}
        >
          Save
        </ButtonLoading>
      </div>
    </div>
  );
};
