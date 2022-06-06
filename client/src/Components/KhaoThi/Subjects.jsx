import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetAllSubject } from "../../redux/apiRequest";
import Loading from "../Loading";
const Subjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const Subjects = useSelector((state) => state.user?.subjects?.data?.subjects);

  const [subjects, setSubjects] = useState(Subjects);

  const [Id, setId] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`${Id}`);
  };

  useEffect(() => {
    GetAllSubject(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setSubjects(Subjects);
  }, [Subjects]);
  if (loading || !subjects) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Nơi nhập điểm</div>
      <div className="body_wrapper">
        <form className="info_form mini_wrapper" onSubmit={handleSearch}>
          <div className="info_container">
            <label className="info_label">Tên môn học: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter name of subject"
              value={Id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>

          <button type="submit" value="" className="info_btn search_btn ">
            Tìm kiếm
          </button>
        </form>
      </div>
      <div className="body_wrapper ">
        <table>
          <tr>
            <th>STT</th>
            <th>Mã môn</th>
            <th>Tên môn</th>
            <th>Giáo viên</th>
            <th>Số lượng sinh viên</th>
          </tr>
          {subjects
            ? subjects.map((item, index) => {
                const { _id, Id_Subject, name, teacher, students } = item;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{Id_Subject}</td>
                    <td>{name}</td>
                    <td>{teacher?.name}</td>
                    <td>{students?.length}</td>
                    <Link className="detail" to={`/KT/SubjectEd/${Id_Subject}`}>
                      About
                    </Link>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
    </div>
  );
};

export default Subjects;
