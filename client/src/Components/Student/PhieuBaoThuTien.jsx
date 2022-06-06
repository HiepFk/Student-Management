import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMyTranscript } from "../../redux/apiRequest";
import Loading from "../Loading";

export default function PhieuBaoThuTien() {
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
      <div className="body_title">Phiếu báo thu tiền</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Tín chỉ </th>
            <th>Hệ số</th>
            <th>Tình Trạng</th>
            <th>Tiền</th>
          </tr>

          {subjects &&
            subjects.map((item, index) => {
              const { _id, money, type_nopTien } = item;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{item?.subject?.Id_Subject}</td>
                  <td>{item?.subject?.name}</td>
                  <td>{item?.subject?.credit}</td>
                  <td>{item?.subject?.coefficient}</td>
                  <td>{type_nopTien ? "Đã nộp" : "Nộp chậm"}</td>
                  <td>{money}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <div className="body_total">Tổng số tiền : {Subjects.Sum_Tien} </div>
      {/* <div className="body_total">Số tiền nộp chậm : 9 triệu</div> */}
    </div>
  );
}
