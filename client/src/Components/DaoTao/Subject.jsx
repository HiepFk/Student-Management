import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { GetSubject, UpdateSubject } from "../../redux/apiRequest";
import Loading from "../Loading";
import Error from "../Error";

const Subject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const subject = useSelector((state) => state.user?.subject?.data?.subject);

  const [students, setStudents] = useState(subject?.students);

  const [Id_Subject, setId_Subject] = useState(subject?.Id_Subject);
  const [name, setName] = useState(subject?.name);
  const [credit, setCredit] = useState(subject?.credit);
  const [coefficient, setCoefficient] = useState(subject?.coefficient);
  const [day_hoc, setDay_hoc] = useState(subject?.day_hoc);
  const [ca_hoc, setCa_hoc] = useState(subject?.ca_hoc);
  const [room_hoc, setRoom_hoc] = useState(subject?.room_hoc);
  const [timeOpen, setTimeOpen] = useState(subject?.timeOpen);
  const [teacherID, setTeacherID] = useState(subject?.teacher?.Id_User);
  const [teacherName, setTeacherName] = useState(subject?.teacher?.name);

  const handeUpdateSubject = (e) => {
    e.preventDefault();
    const data = {
      Id_Subject,
      name,
      credit,
      coefficient,
      day_hoc,
      ca_hoc,
      room_hoc,
      timeOpen,
      teacher: teacherID,
    };
    UpdateSubject(dispatch, id, data);
  };

  useEffect(() => {
    GetSubject(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    setTeacherID(subject?.teacher?.Id_User);
    setTeacherName(subject?.teacher?.name);
    setStudents(subject?.students);
    setId_Subject(subject?.Id_Subject);
    setName(subject?.name);
    setCredit(subject?.credit);
    setCoefficient(subject?.coefficient);
    setDay_hoc(subject?.day_hoc);
    setCa_hoc(subject?.ca_hoc);
    setRoom_hoc(subject?.room_hoc);
    setTimeOpen(subject?.timeOpen);
  }, [subject]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Thông tin môn học</div>
      <div className="body_wrapper">
        <form className="info_form" onSubmit={handeUpdateSubject}>
          <div className="info_container">
            <label className="info_label">Mã môn: </label>
            <input
              type="text"
              className="info_input"
              value={Id_Subject}
              onChange={(e) => setId_Subject(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Tên môn: </label>
            <input
              type="text"
              className="info_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="info_container">
            <label className="info_label">Thứ: </label>
            <input
              type="text"
              className="info_input"
              value={day_hoc}
              onChange={(e) => setDay_hoc(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Ca: </label>
            <input
              type="text"
              className="info_input"
              value={ca_hoc}
              onChange={(e) => setCa_hoc(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Room: </label>
            <input
              type="text"
              className="info_input"
              value={room_hoc}
              onChange={(e) => setRoom_hoc(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Mã giáo viên phụ trách: </label>
            <input
              type="text"
              className="info_input"
              value={teacherID}
              onChange={(e) => setTeacherID(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Tên giáo viên phụ trách: </label>
            <input type="text" className="info_input" value={teacherName} />
          </div>
          <div className="info_container">
            <label className="info_label">Tín chỉ: </label>
            <input
              type="text"
              className="info_input"
              value={credit}
              onChange={(e) => setCredit(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Hệ số: </label>
            <input
              type="text"
              className="info_input"
              value={coefficient}
              onChange={(e) => setCoefficient(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Số tiền: </label>
            <input type="text" className="info_input" value={subject?.money} />
          </div>
          <div className="info_container">
            <label className="info_label">Thời gian mở môn: </label>
            <input
              type="date"
              className="info_input"
              value={timeOpen?.slice(0, 10)}
              onChange={(e) => setTimeOpen(e.target.value)}
            />
          </div>
          <button type="submit" value="" className="info_btn">
            Update Subject
          </button>
        </form>

        <table>
          <tr>
            <th>STT</th>
            <th>Mã sinh viên</th>
            <th>Họ và tên</th>
            <th>Ảnh sinh viên</th>
          </tr>
          {students
            ? students.map((item, index) => {
                const { _id, Id_User, name, photo } = item;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{Id_User}</td>
                    <td>{name}</td>
                    <td>
                      <img src={photo} alt="" className="user_img" />
                    </td>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
    </div>
  );
};

export default Subject;
