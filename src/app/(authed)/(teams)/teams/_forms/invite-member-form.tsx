"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberRole } from "@prisma/client";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
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
import { CreateInviteJoinTeamDto } from "@/domain/dtos/team/create-invite-join-team.dto";

type Props = {
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
};
export type Ref = {
  reset: () => void;
  submit: () => void;
};
export const InviteMemberForm = forwardRef<Ref, Props>((props, ref) => {
  const { isPending, onSubmit } = props;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: TeamMemberRole.VIEWER,
    },
  });

  const handleSubmit = useCallback(
    (value: FormSchema) => {
      onSubmit?.(value);
    },
    [onSubmit],
  );

  useImperativeHandle(ref, () => ({
    reset: () => {
      form.reset();
    },
    submit: () => {
      void form.handleSubmit(handleSubmit)();
    },
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Member's email is here"
                  {...field}
                  value={field.value ?? ""}
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
});

InviteMemberForm.displayName = "InviteMemberForm";

const formSchema = CreateInviteJoinTeamDto.pick({
  email: true,
  role: true,
});
type FormSchema = z.infer<typeof formSchema>;
