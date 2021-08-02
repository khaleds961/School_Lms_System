import { useEffect } from "react";
import { useState } from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import API from '../api'

export default function () {
  const [data, Setdata] = useState([]);

  const fetchData = async () => {

    await API.get(`countallstudentattendance`)
      .then(res => {
        const result = res.data;
        Setdata(result);
          })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h4>All Students Today's PieChart:</h4>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart id="piechart">
          <Pie
            data={data}
            dataKey="value"
            fill="#ED5B5D"
            stroke="white"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
