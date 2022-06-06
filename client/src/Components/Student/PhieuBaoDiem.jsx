import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMyTranscript } from "../../redux/apiRequest";
import Loading from "../Loading";
import styled from "styled-components";

export default function PhieuBaoDiem() {
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
      <div className="body_title">Phiếu báo điểm</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Điểm quá trình</th>
            <th>Điểm cuối kì</th>
            <th>Điểm</th>
            <th>Tình trạng</th>
          </tr>
          {subjects &&
            subjects.map((item, index) => {
              const { _id, subject, diem_QT, diem_CK, diem_TK, type_thi } =
                item;
              return (
                <tr key={_id}>
                  {diem_QT < 4 && type_thi === true ? (
                    <>
                      <Tach>{index + 1}</Tach>
                      <Tach>{subject?.Id_Subject}</Tach>
                      <Tach>{subject?.name}</Tach>
                      <Tach>{diem_QT}</Tach>
                      <Tach></Tach>
                      <Tach></Tach>
                      <Tach>Cấm thi</Tach>
                    </>
                  ) : (
                    <>
                      <td>{index + 1}</td>
                      <td>{subject.Id_Subject}</td>
                      <td>{subject.name}</td>
                      <td>{diem_QT}</td>
                      <td>{diem_CK}</td>
                      <td>{diem_TK}</td>
                      <td>Bình thường</td>
                    </>
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
