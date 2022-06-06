import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetMySubject } from "../../redux/apiRequest";
import Loading from "../Loading";

const TKB = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.user?.loading);
  const Subjects = useSelector((state) => state.user?.subjects?.data?.subjects);

  const [subjects, setSubjects] = useState(Subjects);

  useEffect(() => {
    GetMySubject(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setSubjects(Subjects);
  }, [Subjects]);

  if (loading || !subjects) {
    return <Loading />;
  }

  return (
    <div className="body_left">
      <div className="body_title">Lịch dạy</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Tên môn</th>
            <th>Thứ</th>
            <th>Ca</th>
            <th>Room</th>
          </tr>
          {subjects
            ? subjects.map((item, index) => {
                const { _id, name, day_hoc, ca_hoc, room, students } = item;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{day_hoc}</td>
                    <td>{ca_hoc}</td>
                    <td>{room || "A707"}</td>
                    <Link className="detail" state={students} to={name || ""}>
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

export default TKB;
