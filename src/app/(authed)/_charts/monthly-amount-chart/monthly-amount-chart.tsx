"use client";

import { PureComponent } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  type LineProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { vndFormatter } from "@/lib/vnd-formatter";

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
        <Line
          type="monotone"
          dataKey="in"
          stroke="#82ca9d"
          unit="tr"
          label={<CustomizedLabel />}
        />
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

class CustomizedLabel extends PureComponent<LineProps> {
  render() {
    const {
      x,
      y,
      stroke,
      // @ts-expect-error Expected issue
      value,
    } = this.props;

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {vndFormatter((value as number) / 1000)}
      </text>
    );
  }
}
