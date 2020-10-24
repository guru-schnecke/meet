import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);
  //   console.log("events", events);
  const COLORS = ["#cc99ff", "green", "yellowgreen", "tomato", "skyblue"];
  useEffect(() => {
    setData(() => getData());
  }, [events]);

  function getData() {
    const genres = ["React", "JavaScript", "Node", "jQuery", "AngularJS"];
    let d = [];
    genres.forEach((genre) => {
      const value = events.filter(({ summary }) => {
        return summary.split(" ").includes(genre);
      });
      d.push({ name: genre, value: value.length });
      console.log(d);
      return d;
    });

    return d;
  }

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
