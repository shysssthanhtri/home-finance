"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type TUserEntity, UserEntity } from "@/domain/entities/user.entity";

type Props = {
  user?: TUserEntity;
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
};
export type UserInfoFormRef = {
  reset: () => void;
  submit: () => void;
};
export const UserInfoForm = forwardRef<UserInfoFormRef, Props>((props, ref) => {
  const { user, isPending, onSubmit } = props;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
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
                  placeholder="Your email is here"
                  {...field}
                  value={field.value ?? ""}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name is here"
                  {...field}
                  value={field.value ?? undefined}
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
});

UserInfoForm.displayName = "UserInfoForm";

const formSchema = UserEntity.pick({
  email: true,
}).extend({
  name: z.string().min(3).max(30),
});
type FormSchema = z.infer<typeof formSchema>;
