"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CollapsibleCard } from "@/components/collapsible-card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { type TUserEntity, UserEntity } from "@/domain/entities/user.entity";
import { api } from "@/trpc/react";

type Props = {
  user: TUserEntity;
};
export const UserInfo = ({ user }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = api.user.updateUser.useMutation({
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

  const form = useForm<FormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
    },
  });

  const onSubmit = useCallback(
    (values: FormData) => {
      mutate({
        name: values.name,
      });
    },
    [mutate],
  );

  return (
    <CollapsibleCard title="Info">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    disabled={isPending}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-end">
            <Button type="submit" size="sm" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </CollapsibleCard>
  );
};

const userFormSchema = z.object(UserEntity.shape).pick({
  email: true,
  name: true,
});
type FormData = z.infer<typeof userFormSchema>;
