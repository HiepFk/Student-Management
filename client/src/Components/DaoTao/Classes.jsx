import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { GetAllClass, AddAClass } from "../../redux/apiRequest";
import Loading from "../Loading";

const Classes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user?.loading);
  const Classes = useSelector((state) => state.user?.classes?.data?.classes);

  const [classes, setClasses] = useState(Classes);

  const [Class, setClass] = useState("");
  const [Teacher, setTeacher] = useState("");
  const [id, setId] = useState("");
  const handeAddClass = (e) => {
    e.preventDefault();
    const data = {
      name: Class,
      teacher: Teacher,
    };
    AddAClass(dispatch, data, navigate);
  };

  const handeSearch = (e) => {
    e.preventDefault();
    navigate(`/DT/Classes/${id}`);
  };

  useEffect(() => {
    GetAllClass(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setClasses(Classes);
  }, [Classes]);

  if (loading || !classes) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Tất cả lớp học </div>
      <div className="body_wrapper">
        <form className="info_form mini_wrapper" onSubmit={handeSearch}>
          <div className="info_container">
            <label className="info_label">Tên lớp: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter Name"
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
            <th>Tên Lớp</th>
            <th>Mã giáo viên</th>
            <th>Giáo viên chủ nhiệm</th>
            <th>Số lượng sinh viên</th>
          </tr>
          {classes
            ? classes.map((item, index) => {
                const { _id, name, teacher, students } = item;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{teacher?.Id_User}</td>
                    <td>{teacher?.name}</td>
                    <td>{students?.length}</td>
                    <Link className="detail" to={name || ""}>
                      About
                    </Link>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
      <div className="body_title">Thêm Lớp Học</div>
      <div className="body_wrapper">
        <form className="info_form" onSubmit={handeAddClass}>
          <div className="info_container">
            <label className="info_label">Tên lớp: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter Name"
              value={Class}
              onChange={(e) => setClass(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Mã GVCN: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={Teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />
          </div>
          <button type="submit" className="info_btn">
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default Classes;
