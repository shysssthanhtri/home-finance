import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionType } from "@prisma/client";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { transactionTypeDisplay } from "@/config/transaction-type";
import { GetTransactionInDurationDto } from "@/domain/dtos/transaction/get-transaction-in-duration.dto";

type Props = {
  options?: FormSchema;
  onSubmit?: (value: FormSchema) => void;
};
export type Ref = {
  reset: () => void;
  submit: () => void;
};
export const FilterForm = forwardRef<Ref, Props>((props, ref) => {
  const { options, onSubmit } = props;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: options,
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
          name="types"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel className="text-base">Types</FormLabel>
              </div>
              {Object.values(TransactionType).map((type) => (
                <FormField
                  key={type}
                  control={form.control}
                  name="types"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={type}
                        className="flex flex-row items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(type)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value ?? []), type])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== type,
                                    ),
                                  );
                            }}
                            className="rounded-none"
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {transactionTypeDisplay[type]}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

FilterForm.displayName = "FilterForm";

const formSchema = GetTransactionInDurationDto.pick({
  types: true,
});
type FormSchema = z.infer<typeof formSchema>;
