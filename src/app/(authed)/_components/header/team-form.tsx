"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { type RefAttributes, useCallback } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeamEntity } from "@/domain/entities/team.entity";

type Props = {
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
  formRef?: RefAttributes<HTMLFormElement>["ref"];
};
export const TeamForm = ({ isPending, onSubmit, formRef }: Props) => {
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

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your new team's name"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const formSchema = TeamEntity.pick({
  name: true,
});
type FormSchema = z.infer<typeof formSchema>;
