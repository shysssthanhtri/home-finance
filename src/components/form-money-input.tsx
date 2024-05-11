"use client";
import { useReducer } from "react";
import {
  type FieldValues,
  type Path,
  type PathValue,
  type UseFormReturn,
} from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { vndFormatter } from "@/lib/vnd-formatter";

type TextInputProps<FormValue extends FieldValues> = {
  form: UseFormReturn<FormValue>;
  name: Path<FormValue>;
  label: string;
  placeholder: string;
};

export default function MoneyInput<FormValue extends FieldValues>(
  props: TextInputProps<FormValue>,
) {
  const initialValue = props.form.getValues()[props.name]
    ? vndFormatter(props.form.getValues()[props.name])
    : "";

  const [value, setValue] = useReducer((_: unknown, next: string) => {
    const digits = next.replace(/\D/g, "");
    return vndFormatter(Number(digits));
  }, initialValue);

  function handleChange(
    realChangeFn: (value: number) => void,
    formattedValue: string,
  ) {
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits);
    realChangeFn(realValue);
  }

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value as PathValue<FormValue, Path<FormValue>>;
        const _change = field.onChange;

        return (
          <FormItem>
            <FormLabel>{props.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={props.placeholder}
                type="text"
                {...field}
                onChange={(ev) => {
                  setValue(ev.target.value);
                  handleChange(_change, ev.target.value);
                }}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
