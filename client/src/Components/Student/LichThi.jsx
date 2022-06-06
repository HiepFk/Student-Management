import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMyTranscript } from "../../redux/apiRequest";
import Loading from "../Loading";
import styled from "styled-components";

export default function LichThi() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user?.loading);
  const Subjects = useSelector(
    (state) => state.user?.mySubject?.data?.transcripts?.subjects
  );

  const [subjects, setSubjects] = useState(Subjects);

  useEffect(() => {
    GetMyTranscript(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setSubjects(Subjects);
  }, [Subjects]);

  if (loading || !subjects) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Lịch thi</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Thứ</th>
            <th>Ca</th>
            <th>Room</th>
            <th>Ngày thi</th>
            <th>Tình trạng</th>
          </tr>
          {subjects &&
            subjects.map((item, index) => {
              const { type_thi, type_thiLai, diem_TK } = item;
              const {
                id,
                Id_Subject,
                name,
                day_thi,
                ca_thi,
                room_thi,
                timeThi,
              } = item?.subject;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{Id_Subject}</td>
                  <td>{name}</td>
                  <td>{day_thi}</td>
                  <td>{ca_thi}</td>
                  <td>{room_thi}</td>
                  <td>{timeThi.slice(0, 10)}</td>
                  {diem_TK && type_thi === true && type_thiLai === false ? (
                    <ChuaThi>Đã thi</ChuaThi>
                  ) : diem_TK && type_thiLai === true ? (
                    <DKThi>ĐK Thi Lại</DKThi>
                  ) : (
                    <Tach>Chưa thi</Tach>
                  )}
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}

const Tach = styled.td`
  color: red;
  font-weight: bold;
`;
const ChuaThi = styled.td`
  color: rgb(26, 143, 244);
  font-weight: bold;
`;
const DKThi = styled.td`
  color: #5ac276;
  font-weight: bold;
`;
