"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

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
import { Separator } from "@/components/ui/separator";
import { RequestJoinTeamDto } from "@/domain/entities/team.entity";

type Props = {
  open?: boolean;
  close?: () => void;
};
export const RequestJoinTeamDialog = ({ open, close }: Props) => {
  const form = useForm<z.infer<typeof RequestJoinTeamDto>>({
    resolver: zodResolver(RequestJoinTeamDto),
    defaultValues: {
      id: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof RequestJoinTeamDto>) => {
    console.log({ values });
  }, []);

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
            Request to join a team. You can ask for team id from team&apos;s
            members
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" size="sm">
                Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
