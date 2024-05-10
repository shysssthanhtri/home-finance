"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { TeamEntity } from "@/domain/entities/team.entity";

type Props = {
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
  formRef?: React.RefAttributes<HTMLFormElement>["ref"];
};
export const TransactionForm = (props: Props) => {
  const { onSubmit, isPending, formRef } = props;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = useCallback(
    (value: FormSchema) => {
      onSubmit?.(value);
    },
    [onSubmit],
  );

  return <div>TransactionForm</div>;
};

const formSchema = TeamEntity.pick({
  name: true,
});
type FormSchema = z.infer<typeof formSchema>;
