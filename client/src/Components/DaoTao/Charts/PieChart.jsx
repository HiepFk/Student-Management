import React from "react";
import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function PieChart({ users }) {
  const a = [
    "Yếu: 0-6",
    "Trung Bình: 6-7",
    "Khá: 7-8",
    "Giỏi: 8-9",
    "Xuất Sắc: 9-10",
  ];
  const b = [0, 0, 0, 0, 0];
  // eslint-disable-next-line array-callback-return
  users.map((item, index) => {
    let a = item.Tb_diem;
    switch (index <= users.length) {
      case a < 6:
        b[0]++;
        break;
      case a >= 6 && a < 7:
        b[1]++;
        break;
      case a >= 7 && a < 8:
        b[2]++;
        break;
      case a >= 8 && a < 9:
        b[3]++;
        break;
      default:
        b[4]++;
    }
  });
  return (
    <Pie
      data={{
        labels: a.map((item) => item),
        datasets: [
          {
            label: "Bảng tín chỉ",
            data: b.map((item) => item),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 99, 132, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
}

export default PieChart;
