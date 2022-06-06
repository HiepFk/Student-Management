import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetMySubjectEd,
  GetNotMySubject,
  StudentDKHoc,
  StudentHuyDKHoc,
} from "../../redux/apiRequest";
import Loading from "../Loading";

export default function DKHoc() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user?.loading);

  const NotMySubject = useSelector(
    (state) => state.user?.subjects?.data?.subjects
  );
  const MySubject = useSelector(
    (state) => state.user?.mySubject?.data?.subjects
  );

  const [notMy, setNotMy] = useState("");
  const [my, setMy] = useState("");

  useEffect(() => {
    GetNotMySubject(dispatch);
    GetMySubjectEd(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setNotMy(NotMySubject);
    setMy(MySubject);
  }, [NotMySubject, MySubject]);

  if (loading || !notMy) {
    return <Loading />;
  }

  const handleDK = (id) => {
    const data = {
      subject: id,
    };
    StudentDKHoc(dispatch, data);
  };
  const handleHuy = (id) => {
    StudentHuyDKHoc(dispatch, id);
  };
  if (new Date(notMy[0]?.timeOpen) >= new Date()) {
    return (
      <div className="body_left">
        <div
          style={{
            display: "flex",
            color: "#FF4C4C",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Chưa đến lúc đăng kí
          </h1>
          <p
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {new Date(notMy[0].timeOpen).toLocaleString()}
          </p>
        </div>
        <span></span>
      </div>
    );
  }
  return (
    <div className="body_left">
      <div className="body_title">Danh sách môn đăng ký</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Giáo viên</th>
            <th>Thứ</th>
            <th>Ca</th>
            <th>Room</th>
            <th>Tín</th>
          </tr>
          {notMy &&
            notMy.map((item, index) => {
              const {
                _id,
                Id_Subject,
                name,
                teacher,
                day_hoc,
                ca_hoc,
                room_hoc,
                credit,
              } = item;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{Id_Subject}</td>
                  <td>{name}</td>
                  <td>{teacher?.name}</td>
                  <td>{day_hoc}</td>
                  <td>{ca_hoc}</td>
                  <td>{room_hoc}</td>
                  <td>{credit}</td>
                  <button
                    // type="buton"
                    className="detail"
                    onClick={() => handleDK(_id)}
                  >
                    Đăng kí
                  </button>
                </tr>
              );
            })}
        </table>
      </div>
      <div className="body_title">Danh sách môn đã đăng ký</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Giáo viên</th>
            <th>Thứ</th>
            <th>Ca</th>
            <th>Room</th>
            <th>Tín</th>
          </tr>
          {my &&
            my.map((item, index) => {
              const { _id } = item;
              const {
                Id_Subject,
                name,
                teacher,
                day_hoc,
                ca_hoc,
                room_hoc,
                credit,
              } = item?.subject;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{Id_Subject}</td>
                  <td>{name}</td>
                  <td>{teacher?.name}</td>
                  <td>{day_hoc}</td>
                  <td>{ca_hoc}</td>
                  <td>{room_hoc}</td>
                  <td>{credit}</td>
                  <button
                    // type="buton"
                    className="detail"
                    onClick={() => handleHuy(_id)}
                    style={{
                      backgroundColor: " rgba(255, 0, 0, 0.6)",
                    }}
                  >
                    Hủy môn
                  </button>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}
