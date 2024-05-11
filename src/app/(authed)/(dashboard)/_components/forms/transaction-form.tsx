"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionType } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { transactionTypeDisplay } from "@/config/transaction-type";
import { CreateTransactionDto } from "@/domain/dtos/transaction/create-transaction.dto";
import { cn } from "@/lib/utils";

export type TransactionFormRef = {
  refresh: () => void;
};

type Props = {
  isPending?: boolean;
  onSubmit?: (value: FormSchema) => void;
  formRef?: React.RefAttributes<HTMLFormElement>["ref"];
};
export const TransactionForm = forwardRef<TransactionFormRef, Props>(
  (props: Props, ref) => {
    const { onSubmit, isPending, formRef } = props;

    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        time: new Date(),
        type: TransactionType.OUT,
        title: "",
        amount: 0,
        description: undefined,
      },
    });

    const handleSubmit = useCallback(
      (value: FormSchema) => {
        onSubmit?.(value);
      },
      [onSubmit],
    );

    const refresh = useCallback(() => {
      form.resetField("title");
      form.setValue("description", undefined);
      form.resetField("amount");
    }, [form]);

    useImperativeHandle(ref, () => ({
      refresh,
    }));

    return (
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Transaction's title"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Transaction's description"
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
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Transaction's amount"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.currentTarget.value));
                    }}
                    type="number"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Time</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When your transaction happens.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormControl>
                  <div className="flex gap-x-4">
                    <Switch
                      className="data-[state=unchecked]:bg-destructive"
                      checked={field.value === TransactionType.IN}
                      onCheckedChange={(value) => {
                        field.onChange(
                          value ? TransactionType.IN : TransactionType.OUT,
                        );
                      }}
                    />
                    <span>{transactionTypeDisplay[field.value]}</span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
);

TransactionForm.displayName = "TransactionForm";

const formSchema = CreateTransactionDto.omit({
  teamId: true,
});
type FormSchema = z.infer<typeof formSchema>;