"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberRole } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
import {
  RequestJoinTeamDto,
  type TRequestJoinTeamDto,
} from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  open?: boolean;
  close?: () => void;
};
export const RequestJoinTeamDialog = ({ open, close }: Props) => {
  const router = useRouter();
  const { mutate, isPending } = api.team.requestJoin.useMutation({
    onSuccess: () => {
      router.refresh();
      onClose();
    },
  });

  const form = useForm<TRequestJoinTeamDto>({
    resolver: zodResolver(RequestJoinTeamDto),
    defaultValues: {
      id: "",
      role: TeamMemberRole.VIEWER,
    },
  });

  const onSubmit = useCallback(
    (values: TRequestJoinTeamDto) => {
      mutate(values);
    },
    [mutate],
  );

  const onClose = useCallback(() => {
    form.reset();
    close?.();
  }, [close, form]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to join a team</DialogTitle>
          <DialogDescription>
            Request to join a team.
            <br />
            You can ask team&apos;s members for the id.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id"
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

            <DialogFooter>
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
