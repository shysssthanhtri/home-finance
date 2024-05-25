import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { teamMemberRoleDisplay } from "@/config/team-member-role";
import {
  RequestJoinTeamInfoDto,
  type TRequestJoinTeamInfoDto,
} from "@/domain/dtos/team";

type Props = {
  request: TRequestJoinTeamInfoDto;
};
export const RequestInfoForm = ({ request }: Props) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: request,
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="teamName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? undefined} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team id</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? undefined} disabled />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={teamMemberRoleDisplay[field.value] ?? undefined}
                  disabled
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

const formSchema = RequestJoinTeamInfoDto.pick({
  teamName: true,
  userName: true,
  role: true,
  teamId: true,
});
type FormSchema = z.infer<typeof formSchema>;
