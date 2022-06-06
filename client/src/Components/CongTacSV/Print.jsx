import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loading";
import { GetStudentTranscript } from "../../redux/apiRequest";

function Print() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user?.loading);
  const Subjects = useSelector(
    (state) => state.user?.subjects?.data?.transcripts?.[0]
  );

  const [subjects, setSubjects] = useState(Subjects);

  useEffect(() => {
    GetStudentTranscript(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    setSubjects(Subjects);
  }, [Subjects]);

  const printObject = useRef();
  const handlePrint = useReactToPrint({
    content: () => printObject.current,
  });

  if (loading || !subjects) {
    return <Loading />;
  }
  return (
    <div
      className="body_left"
      ref={printObject}
      style={{ marginRight: "2rem" }}
    >
      <div className="body_title">Bảng điểm sinh viên </div>
      <div className="body_wrapper">
        <form className="info_form ">
          <div className="info_container">
            <label className="info_label">Mã sinh viên: </label>
            <input
              type="text"
              className="info_input"
              value={subjects?.student?.Id_User}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Tên sinh viên: </label>
            <input
              type="text"
              className="info_input"
              value={subjects?.student?.name}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Tổng tín chỉ: </label>
            <input
              type="text"
              className="info_input"
              value={subjects?.Sum_TichLuy}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Trung bình tích lũy: </label>
            <input
              type="text"
              className="info_input"
              value={subjects?.Tb_diem}
            />
          </div>
        </form>
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Name</th>
            <th>Tín chỉ</th>
            <th>Điểm</th>
          </tr>
          {subjects?.subjects &&
            subjects?.subjects.map((item, index) => {
              const { subject, diem_TK } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subject?.Id_Subject}</td>
                  <td>{subject?.name}</td>
                  <td>{subject?.credit}</td>
                  <td>{diem_TK}</td>
                </tr>
              );
            })}
        </table>
      </div>
      <button
        type="button"
        value=""
        className="info_btn"
        onClick={handlePrint}
        style={{ marginTop: "1rem" }}
      >
        PDF
      </button>
    </div>
  );
}

export default Print;
