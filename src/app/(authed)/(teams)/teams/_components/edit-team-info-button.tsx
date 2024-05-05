"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useToast } from "@/components/ui/use-toast";
import {
  type TTeamEntity,
  type TUpdateTeamDto,
  UpdateTeamDto,
} from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  team: TTeamEntity;
};
export const EditTeamInfoButton = ({ team }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const utils = api.useUtils();
  const onOpenChange = useCallback(() => setOpen((prev) => !prev), [setOpen]);

  const { mutate, isPending } = api.team.updateTeam.useMutation({
    onSuccess: async () => {
      router.refresh();
      onOpenChange();
      toast({
        title: "Saved",
        variant: "successful",
      });

      void utils.team.getTeam.refetch({ id: team.id });
    },
    onError: (err) => {
      toast({
        title: "Something wrong",
        variant: "destructive",
        description: err.message,
      });
    },
  });

  const form = useForm<TUpdateTeamDto>({
    resolver: zodResolver(UpdateTeamDto),
    defaultValues: {
      id: team.id,
      name: team.name,
    },
  });

  const onSubmit = useCallback(
    (values: TUpdateTeamDto) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="w-full space-x-2 sm:w-fit"
          size="sm"
          variant="outline"
        >
          <Settings />
          <span className="hidden sm:block">Edit info</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{team.name}</DialogTitle>
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
