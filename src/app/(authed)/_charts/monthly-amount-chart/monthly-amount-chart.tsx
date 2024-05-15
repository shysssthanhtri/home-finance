"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  data: MonthlyAmountDataItem[];
};
export const MonthlyAmountChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data.map((i) => ({
          ...i,
          save: i.in - i.out,
        }))}
      >
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `${value / 1_000_000}tr`} />
        <Tooltip<number, ""> formatter={(value) => value / 1_000_000} />
        <Legend />
        <Line type="monotone" dataKey="in" stroke="#82ca9d" unit="tr" />
        <Line type="monotone" dataKey="out" stroke="red" unit="tr" />
        <Line type="monotone" dataKey="save" stroke="#8884d8" unit="tr" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export type MonthlyAmountDataItem = {
  year: number;
  month: number;
  in: number;
  out: number;
};
