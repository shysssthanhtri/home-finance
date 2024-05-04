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
import { CreateTeamDto } from "@/domain/entities/team.entity";

type Props = {
  open?: boolean;
  close?: () => void;
};
const CreateTeamDialog = ({ open, close }: Props) => {
  const form = useForm<z.infer<typeof CreateTeamDto>>({
    resolver: zodResolver(CreateTeamDto),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = useCallback((values: z.infer<typeof CreateTeamDto>) => {
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
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Create a new team, to separate data from your personal.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" size="sm">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamDialog;
