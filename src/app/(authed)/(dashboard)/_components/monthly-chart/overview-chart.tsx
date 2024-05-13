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
  data: DataItem[];
};
export const OverviewChart = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="6 6" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={(value) => `${value / 1000}k`} />
        <Tooltip<number, ""> formatter={(value) => value / 1000} />
        <Legend />
        <Line type="monotone" dataKey="in" stroke="#82ca9d" unit="k" />
        <Line type="monotone" dataKey="out" stroke="red" unit="k" />
        <Line type="monotone" dataKey="save" stroke="#8884d8" unit="k" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export type DataItem = {
  year: number;
  month: number;
  in: number;
  out: number;
  save: number;
};
