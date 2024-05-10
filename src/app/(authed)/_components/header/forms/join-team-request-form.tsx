"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberRole } from "@prisma/client";
import React, { useCallback } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
import { CreateRequestJoinTeamDto } from "@/domain/dtos/team";

type Props = {
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
  formRef?: React.RefAttributes<HTMLFormElement>["ref"];
};

export const JoinTeamRequestForm = (props: Props) => {
  const { isPending, onSubmit, formRef } = props;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamId: "",
      role: TeamMemberRole.VIEWER,
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
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team&apos;s id</FormLabel>
              <FormControl>
                <Input
                  placeholder="Team's id"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(TeamMemberRole).map((role) => (
                    <SelectItem value={role} key={role}>
                      {teamMemberRoleDisplay[role]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const formSchema = CreateRequestJoinTeamDto;
type FormSchema = z.infer<typeof formSchema>;
