import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMyTranscript } from "../../redux/apiRequest";
import Loading from "../Loading";
import styled from "styled-components";

export default function BangDiem() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user?.loading);
  const Subjects = useSelector(
    (state) => state.user?.mySubject?.data?.transcripts
  );

  const [subjects, setSubjects] = useState(Subjects?.subjects);

  useEffect(() => {
    GetMyTranscript(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setSubjects(Subjects?.subjects);
  }, [Subjects]);

  if (loading || !subjects) {
    return <Loading />;
  }
  return (
    <div className="body_left">
      <div className="body_title">Bảng điểm</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Tín chỉ</th>
            <th>Điểm</th>
            <th>Tình trạng</th>
          </tr>
          {subjects &&
            subjects.map((item, index) => {
              const { _id, diem_QT, diem_TK, type_thi } = item;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{item?.subject?.Id_Subject}</td>
                  <td>{item?.subject?.name}</td>
                  <td>{item?.subject?.credit}</td>
                  <td>{diem_TK}</td>
                  {diem_TK > 4 && type_thi === true && <td>Bình thường</td>}
                  {diem_QT < 4 && type_thi === true && <Tach>Học lại</Tach>}
                  {diem_QT >= 4 && diem_TK < 4 && type_thi === true && (
                    <Tach>Thi lại</Tach>
                  )}
                  {type_thi === false && <ChuaThi>?</ChuaThi>}
                </tr>
              );
            })}
        </table>
      </div>
      <div className="body_total">
        Tổng số tín chỉ tích lũy : {Subjects.Sum_TichLuy}
      </div>
      <div className="body_total">
        Trung bình chung tích lũy : {Subjects.Tb_diem}
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
