import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GetAllTranscript } from "../../redux/apiRequest";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading";

import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
export default function ThongKe() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user.loading);
  const Users = useSelector((state) => state.user?.users.data.users);

  const [users, setUsers] = useState(Users);

  useEffect(() => {
    GetAllTranscript(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setUsers(Users);
  }, [Users]);

  if (loading || !users) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Thống kê</div>
      <Wrapper>
        <Chart style={{ width: 700 }}>
          <BarChart
            users={users}
            type="TichLuy"
            title="Top 5 sinh viên tín chỉ cao nhất"
          />
        </Chart>
        <Chart style={{ width: 700 }}>
          <BarChart
            users={users}
            type="Diem"
            title="Top 5 sinh viên có trung bình tích lũy cao nhất"
          />
        </Chart>
        <Chart style={{ width: 400 }}>
          <PieChart users={users} />
        </Chart>
      </Wrapper>
    </div>
  );
}

const Chart = styled.div`
  margin-bottom: 3rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
