import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetAllSubject } from "../../redux/apiRequest";
import Loading from "../Loading";
import InputLich from "./InputLich";

const LichThi = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user?.loading);
  const Subjects = useSelector((state) => state.user?.subjects?.data?.subjects);

  const [subjects, setSubjects] = useState(Subjects);

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
      <div className="body_title">Tạo lịch thi</div>

      <div className="body_wrapper ">
        <div className="title_wrapper">
          <div className="info_container mini_table">
            <div className="info_desc">STT</div>
          </div>
          <div className="info_container mini_table">
            <div className="info_desc">ID</div>
          </div>
          <div className="info_container mini_table">
            <div className="info_desc">Name</div>
          </div>
          <div className="info_container mini_table">
            <div className="info_desc">Ngày thi</div>
          </div>
          <div className="info_container mini_table">
            <div className="info_desc">Ca thi</div>
          </div>
          <div className="info_container mini_table">
            <div className="info_desc">Phòng thi</div>
          </div>
          <div className="info_container mini_table">
            <div className="info_desc">Ngày thi</div>
          </div>
        </div>
        {subjects
          ? subjects.map((item, index) => {
              return <InputLich item={item} index={index} />;
            })
          : null}
      </div>
    </div>
  );
};

export default LichThi;
