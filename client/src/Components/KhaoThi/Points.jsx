import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../Loading";
import Error from "../Error";
import PointInput from "./PointInput";

import { GetAllStudentEd } from "../../redux/apiRequest";

const Points = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);
  const Users = useSelector((state) => state.user?.users?.data?.subjects);

  const [users, setUsers] = useState(Users);

  useEffect(() => {
    GetAllStudentEd(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    setUsers(Users);
  }, [Users]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="body_left">
      <div className="body_title">Danh sách sinh viên học môn học </div>
      <div className="body_wrapper">
        <div className="title_wrapper">
          <div className="info_container mini_info">
            <div className="info_desc">STT</div>
          </div>
          <div className="info_container mini_info">
            <div className="info_desc">ID</div>
          </div>
          <div className="info_container mini_info">
            <div className="info_desc">Student</div>
          </div>
          <div className="info_container mini_info">
            <div className="info_desc">Quá trình</div>
          </div>
          <div className="info_container mini_info">
            <div className="info_desc">Cuối kì</div>
          </div>
        </div>
        {users
          ? users.map((item, index) => {
              return <PointInput item={item} index={index} key={index} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Points;
