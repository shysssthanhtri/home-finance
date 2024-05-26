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
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={(value) => `${value / 1_000_000}tr`}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip<number, "">
          formatter={(value) => `${value / 1_000_000}`}
          wrapperStyle={{
            backgroundColor: "yellow",
          }}
        />
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
