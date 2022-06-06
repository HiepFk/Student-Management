import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUsers } from "../../redux/apiRequest";
import Loading from "../Loading";

const AllStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user?.loading);
  const Users = useSelector((state) => state.user?.users?.data?.users);

  const [students, setStudents] = useState(Users);

  useEffect(() => {
    GetAllUsers(dispatch, "student");
  }, [dispatch]);

  useEffect(() => {
    setStudents(Users);
  }, [Users]);

  const [id, setId] = useState("");

  const handeSearch = (e) => {
    e.preventDefault();
    navigate(`/CT/Students/${id}`);
  };

  if (loading || !students) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Danh sách sinh viên</div>
      <div className="body_wrapper">
        <form className="info_form mini_wrapper" onSubmit={handeSearch}>
          <div className="info_container">
            <label className="info_label">Mã người dùng: </label>
            <input
              type="text"
              className="info_input"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <button type="submit" className="info_btn search_btn">
            Tìm kiếm
          </button>
        </form>
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
          {students
            ? students.map((item, index) => {
                const { Id_User, name, role } = item;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{Id_User}</td>
                    <td>{name}</td>
                    <td>{role}</td>
                    <Link className="detail" to={`/CT/Students/${Id_User}`}>
                      Info
                    </Link>
                    <Link
                      className="detail"
                      to={`/CT/Transcript/${Id_User}`}
                      style={{ marginLeft: "1rem" }}
                    >
                      Transcript
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

export default AllStudent;
