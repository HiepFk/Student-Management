import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GetAllUsers } from "../../redux/apiRequest";

import Loading from "../Loading";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user?.loading);
  const Users = useSelector((state) => state.user?.users?.data?.users);

  const [users, setUsers] = useState(Users);

  useEffect(() => {
    GetAllUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setUsers(Users);
  }, [Users]);

  const [id, setId] = useState("");

  const handeSearch = (e) => {
    e.preventDefault();
    navigate(`/AD/Users/${id}`);
  };

  if (loading || !users) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Danh sách người dùng</div>
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
          <Link
            to={`/AD/ThongKe`}
            className="info_btn search_btn"
            state={users}
          >
            Thống kê
          </Link>
        </form>
        <table>
          <tbody>
            <tr>
              <th>STT</th>
              <th>Id</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
            {users
              ? users.map((item, index) => {
                  const { _id, Id_User, name, role } = item;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{Id_User}</td>
                      <td>{name}</td>
                      <td>{role}</td>
                      <Link className="detail" to={`/AD/Users/${Id_User}`}>
                        About
                      </Link>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
