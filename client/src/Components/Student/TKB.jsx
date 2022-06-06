import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMyTranscript } from "../../redux/apiRequest";
import Loading from "../Loading";
import styled from "styled-components";

export default function TKB() {
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
      <div className="body_title">Thời khóa biểu</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Giáo viên</th>
            <th>Thứ</th>
            <th>Ca</th>
            <th>Room</th>
            <th>Tình trạng</th>
          </tr>
          {subjects &&
            subjects.map((item, index) => {
              const { type_thi } = item;

              const {
                id,
                Id_Subject,
                name,
                day_hoc,
                ca_hoc,
                room_hoc,
                teacher,
              } = item?.subject;
              return (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{Id_Subject}</td>
                  <td>{name}</td>
                  <td>{teacher?.name}</td>
                  <td>{day_hoc}</td>
                  <td>{ca_hoc}</td>
                  <td>{room_hoc}</td>
                  {type_thi === true ? (
                    <Tach>Đã học</Tach>
                  ) : (
                    <ChuaThi>New</ChuaThi>
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
