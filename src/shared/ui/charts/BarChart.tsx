"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const BarChartBlock = ({ data }: any) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#a0a3a8" />
        <YAxis stroke="#a0a3a8" />

        <Tooltip
          contentStyle={{
            background: "#1a1d24",
            border: "none",
          }}
        />

        <Bar dataKey="value" fill="#13a749" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};