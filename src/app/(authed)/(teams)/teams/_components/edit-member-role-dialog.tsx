import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberRole } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
  type TTeamDetailDto,
  type TTeamEntity,
  type TUpdateMemberRoleDto,
  UpdateMemberRoleDto,
} from "@/domain/entities/team.entity";
import { api } from "@/trpc/react";

type Props = {
  team: TTeamEntity;
  member: TTeamDetailDto["members"][0];
  open?: boolean;
  close?: () => void;
};
export const EditMemberRoleDialog = ({ team, member, open, close }: Props) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<TUpdateMemberRoleDto>({
    resolver: zodResolver(UpdateMemberRoleDto),
    defaultValues: {
      id: team.id,
      role: member.role,
      userId: member.id,
    },
  });

  useEffect(() => {
    form.setValue("role", member.role);
  }, [member.role, form]);

  const onOpenChange = useCallback(() => {
    close?.();
    form.reset();
  }, [form, close]);

  const utils = api.useUtils();
  const { mutate, isPending } = api.team.updateMemberRole.useMutation({
    onSuccess: async () => {
      router.refresh();
      onOpenChange();
      toast({
        title: "Updated",
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
    (values: TUpdateMemberRoleDto) => {
      mutate(values);
    },
    [mutate],
  );

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update role</DialogTitle>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
