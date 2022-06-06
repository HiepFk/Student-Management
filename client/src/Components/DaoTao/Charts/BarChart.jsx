import React from "react";
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ users, type, title }) {
  let data = [];
  if (type === "TichLuy") {
    users = Object.values(users)
      .sort((a, b) => {
        return b.Sum_TichLuy - a.TichLuy;
      })
      .slice(0, 5);
    data = users.map((data) => data.Sum_TichLuy);
  } else {
    users = Object.values(users)
      .sort((a, b) => {
        return b.Tb_diem - a.Tb_diem;
      })
      .slice(0, 5);
    data = users.map((data) => data.Tb_diem);
  }
  return (
    <Bar
      data={{
        labels: users.map((data) => data?.student?.Id_User),
        datasets: [
          {
            label: `${title}`,
            data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

export default BarChart;
