"use client";

import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import {
  TransactionForm,
  type TransactionFormRef,
} from "@/app/(authed)/(dashboard)/_components/forms/transaction-form";
import { ButtonLoading } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { type TTeamEntity } from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  teamId: TTeamEntity["id"];
  children: React.ReactNode;
};
export const AddTransactionDialog = ({ teamId, children }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [keepCreating, setKeepCreating] = useState(false);
  const ref = useRef<TransactionFormRef>(null);

  const { mutate, isPending } = api.transaction.create.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        variant: "successful",
        title: "Saved",
      });
      if (!keepCreating) {
        setOpen(false);
      } else {
        ref.current?.refresh();
      }
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add transaction</DialogTitle>
        </DialogHeader>
        <Separator />
        <TransactionForm
          onSubmit={(value) => {
            mutate({
              ...value,
              teamId,
            });
          }}
          isPending={isPending}
          formRef={formRef}
          ref={ref}
        />
        <Separator />
        <DialogFooter>
          <div className="mt-2 flex items-center space-x-2 sm:mt-0">
            <Checkbox
              id="terms"
              checked={keepCreating}
              onCheckedChange={(value: boolean) => {
                setKeepCreating(value);
              }}
            />
            <label htmlFor="terms" className="text-xs text-gray-400">
              Save to create another one.
            </label>
          </div>
          <ButtonLoading
            size="sm"
            isLoading={isPending}
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
          >
            Add
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
