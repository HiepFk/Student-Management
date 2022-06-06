import React from "react";
import styled from "styled-components";

import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { useLocation } from "react-router-dom";

function PieChart() {
  const location = useLocation();
  const users = location.state;
  const a = [
    "Giáo viên",
    "Phòng đào tạo",
    "Phòng khảo thí",
    "Phòng công tác sinh viên",
    "Admin",
    "Sinh viên",
  ];
  const b = [0, 0, 0, 0, 0, 0];
  // eslint-disable-next-line array-callback-return
  users.map((item) => {
    switch (item.role) {
      case "teacher":
        b[0]++;
        break;
      case "phongDaoTao":
        b[1]++;
        break;
      case "phongKhaoThi":
        b[2]++;
        break;
      case "phongCtsv":
        b[3]++;
        break;
      case "admin":
        b[4]++;
        break;
      default:
        b[5]++;
    }
  });
  return (
    <div className="body_left ">
      <div className="body_title">Thống kê</div>
      <Wrapper>
        <div style={{ width: 600 }}>
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
                    "rgba(255, 206, 86, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 206, 86, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export default PieChart;
