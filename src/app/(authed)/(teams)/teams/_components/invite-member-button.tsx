"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberRole } from "@prisma/client";
import { Loader2, UserRoundPlus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
import {
  InviteMemberDto,
  type TInviteMemberDto,
  type TTeamEntity,
} from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  team: TTeamEntity;
};
export const InviteMemberButton = ({ team }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const form = useForm<TInviteMemberDto>({
    resolver: zodResolver(InviteMemberDto),
    defaultValues: {
      email: "",
      role: TeamMemberRole.VIEWER,
      id: team.id,
    },
  });

  const onOpenChange = useCallback(() => {
    setOpen((prev) => !prev);
    form.reset();
  }, [setOpen, form]);

  const utils = api.useUtils();
  const { mutate, isPending } = api.team.inviteMember.useMutation({
    onSuccess: async () => {
      router.refresh();
      onOpenChange();
      toast({
        title: "Invited",
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

  const onSubmit = useCallback(
    (values: TInviteMemberDto) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full space-x-2 sm:w-fit" size="sm">
          <UserRoundPlus />
          <span className="hidden sm:block">Invite member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite member</DialogTitle>
        </DialogHeader>
        <Separator />
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
                      placeholder="Member's email"
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
                Invite
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
