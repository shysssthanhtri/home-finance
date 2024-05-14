"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

import {
  TransactionForm,
  type TransactionFormRef,
} from "@/app/(authed)/_forms/transaction-form";
import { ButtonLoading } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { type TTransactionEntity } from "@/domain/entities/transaction.entity";
import { api } from "@/trpc/react";

type Props = {
  transaction?: TTransactionEntity;
  close?: () => void;
  afterSuccess?: () => void;
};
export const TransactionDialog = ({
  transaction,
  close,
  afterSuccess,
}: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const ref = useRef<TransactionFormRef>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { mutate: editTransaction, isPending: isSaving } =
    api.transaction.edit.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({
          variant: "successful",
          title: "Saved",
        });
        close?.();
        afterSuccess?.();
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: err.message,
        });
      },
    });

  const { mutate: removeTransaction, isPending: isRemoving } =
    api.transaction.remove.useMutation({
      onSuccess: () => {
        router.refresh();
        toast({
          variant: "successful",
          title: "Saved",
        });
        close?.();
        afterSuccess?.();
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
    <Dialog open={!!transaction} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit transaction</DialogTitle>
        </DialogHeader>
        <Separator />
        <TransactionForm
          transaction={transaction}
          formRef={formRef}
          ref={ref}
          isPending={isSaving}
          onSubmit={(value) =>
            editTransaction({
              ...value,
              id: transaction?.id ?? "",
            })
          }
        />
        <Separator />
        <DialogFooter>
          <ButtonLoading
            size="sm"
            onClick={() => {
              removeTransaction({ id: transaction?.id ?? "" });
            }}
            variant="destructive"
            disabled={isSaving}
            isLoading={isRemoving}
          >
            Remove
          </ButtonLoading>
          <ButtonLoading
            size="sm"
            onClick={() => {
              formRef.current?.requestSubmit();
            }}
            disabled={isRemoving}
            isLoading={isSaving}
          >
            Save
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
