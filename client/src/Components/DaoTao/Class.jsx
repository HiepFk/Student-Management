import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { GetClass, UpdateClass } from "../../redux/apiRequest";
import Loading from "../Loading";
import Error from "../Error";

const Class = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  const thatClass = useSelector((state) => state.user?.class?.data?.thatClass);
  const [teacher, setteacher] = useState(thatClass?.teacher);
  const [_id, set_Id] = useState(thatClass?._id);
  const [students, setStudents] = useState(thatClass?.students);
  const [name, setName] = useState(thatClass?.name);

  // const [Class, setClass] = useState(name);
  // const [Teacher, setTeacher] = useState(teacher?.Id_User);

  useEffect(() => {
    GetClass(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    setteacher(thatClass?.teacher);
    set_Id(thatClass?._id);
    setStudents(thatClass?.students);
    setName(thatClass?.name);
  }, [thatClass]);

  const handeUpdateClass = (e) => {
    e.preventDefault();
    let id = "";
    if (teacher.Id_User) {
      id = teacher.Id_User;
    } else {
      id = teacher;
    }
    const data = {
      teacher: id,
      name,
    };
    UpdateClass(dispatch, _id, data);
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Tìm Kiếm Lớp Học</div>
      <div className="body_wrapper">
        <form className="info_form" onSubmit={handeUpdateClass}>
          <div className="info_container">
            <label className="info_label">Tên lớp: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Mã giáo viên chủ nhiệm: </label>
            <input
              type="text"
              className="info_input"
              value={teacher?.Id_User}
              onChange={(e) => setteacher(e.target.value)}
            />
          </div>
          <div className="info_container">
            <label className="info_label">Tên giáo viên chủ nhiệm: </label>
            <input type="text" className="info_input" value={teacher?.name} />
          </div>
          <button type="submit" value="" className="info_btn">
            Update Class
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
                      <img
                        src={photo}
                        alt="Ảnh sinh viên"
                        className="user_img"
                      />
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

export default Class;
