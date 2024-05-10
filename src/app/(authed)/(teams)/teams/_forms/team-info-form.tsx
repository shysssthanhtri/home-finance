"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CopyButton } from "@/components/copy-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TeamEntity, type TTeamEntity } from "@/domain/entities/team.entity";
import { cn } from "@/lib/utils";

type Props = {
  team: TTeamEntity;
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
  formRef?: React.RefAttributes<HTMLFormElement>["ref"];
  formClassName?: string;
};
export const TeamInfoForm = (props: Props) => {
  const { team, isPending, onSubmit, formRef, formClassName } = props;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: team.id,
      name: team.name,
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
        className={cn("space-y-2 sm:space-y-4", formClassName)}
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="space-x-2">
                <span>Team id</span>
                <CopyButton text={team.id}>
                  <span className="text-xs">Copy id</span>
                </CopyButton>
              </FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

const formSchema = z.object(TeamEntity.shape).pick({
  id: true,
  name: true,
});
type FormSchema = z.infer<typeof formSchema>;
