import React from "react";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ChartView({ getData }) {
  return (
    <ResponsiveContainer height={400}>
      <ScatterChart
        width={800}
        height={250}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="category" dataKey="city" name="city" />
        <YAxis
          type="number"
          dataKey="number"
          name="number of events"
          allowDecimals={false}
        />
        <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter data={getData()} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

export default ChartView;
