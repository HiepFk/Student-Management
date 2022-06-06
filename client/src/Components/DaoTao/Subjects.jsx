import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { GetAllSubject, AddASubject } from "../../redux/apiRequest";
import Loading from "../Loading";

const Subjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user?.loading);
  const Subjects = useSelector((state) => state.user?.subjects?.data?.subjects);
  const [id, setId] = useState("");

  const [subjects, setSubjects] = useState(Subjects);

  const [Id_Subject, setId_Subject] = useState("");
  const [name, setName] = useState("");
  const [Teacher, setTeacher] = useState("");
  const [day_hoc, setDay_hoc] = useState("");
  const [ca_hoc, setCa_hoc] = useState("");
  const [room_hoc, setRoom_hoc] = useState("");
  useEffect(() => {
    GetAllSubject(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setSubjects(Subjects);
  }, [Subjects]);

  const handeAddSubject = (e) => {
    e.preventDefault();
    const data = {
      Id_Subject,
      name,
      teacher: Teacher,
      day_hoc,
      ca_hoc,
      room_hoc,
    };
    AddASubject(dispatch, data);
    setId_Subject("");
    setName("");
    setTeacher("");
    setDay_hoc("");
    setCa_hoc("");
    setRoom_hoc("");
  };

  const handeSearch = (e) => {
    e.preventDefault();
    navigate(`/DT/Subjects/${id}`);
  };

  if (loading || !subjects) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Danh sách môn học</div>
      <div className="body_wrapper">
        <form className="info_form mini_wrapper" onSubmit={handeSearch}>
          <div className="info_container">
            <label className="info_label">Mã môn: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <button type="submit" value="" className="info_btn search_btn">
            Tìm kiếm
          </button>
        </form>

        <table>
          <tr>
            <th>STT</th>
            <th>Mã môn</th>
            <th>Tên môn</th>
            <th>Mã giáo viên</th>
            <th>Giáo viên</th>
          </tr>
          {subjects &&
            subjects.map((item, index) => {
              const { _id, Id_Subject, name, teacher } = item;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{Id_Subject}</td>
                  <td>{name}</td>
                  <td>{teacher?.Id_User}</td>
                  <td>{teacher?.name}</td>
                  <Link className="detail" to={Id_Subject || ""}>
                    About
                  </Link>
                </tr>
              );
            })}
        </table>
      </div>
      <div className="body_title">Thêm môn học </div>
      <div className="body_wrapper">
        <form className="info_form" onSubmit={handeAddSubject}>
          <div className="info_container">
            <label className="info_label">Mã môn: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter Name"
              value={Id_Subject}
              onChange={(e) => setId_Subject(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Tên môn: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Giáo viên phụ trách: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={Teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Thứ: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={day_hoc}
              onChange={(e) => setDay_hoc(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Ca: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={ca_hoc}
              onChange={(e) => setCa_hoc(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Room: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={room_hoc}
              onChange={(e) => setRoom_hoc(e.target.value)}
            />
          </div>
          <button type="submit" value="" className="info_btn">
            All Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subjects;
