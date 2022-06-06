import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetMySubjectPointEd, DangKiThiLai } from "../../redux/apiRequest";
import Loading from "../Loading";
export default function DKThiLai() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user?.loading);

  const NotMySubject = useSelector(
    (state) => state.user?.subjects?.data?.subjects
  );
  const [notMyEd, setNotMyEd] = useState("");

  useEffect(() => {
    GetMySubjectPointEd(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setNotMyEd(NotMySubject);
  }, [NotMySubject]);

  if (loading || !notMyEd) {
    return <Loading />;
  }

  const handleDK = (id) => {
    const data = {
      type_thiLai: true,
    };
    DangKiThiLai(dispatch, id, data);
  };
  const handleHuyDK = (id) => {
    const data = {
      type_thiLai: false,
    };
    DangKiThiLai(dispatch, id, data);
  };
  return (
    <div className="body_left">
      <div className="body_title">Danh sách môn thi lại</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>Id</th>
            <th>Tên môn</th>
            <th>Thứ</th>
            <th>Ca</th>
            <th>Room</th>
          </tr>
          {notMyEd &&
            notMyEd.map((item, index) => {
              const { _id } = item;
              return (
                <tr key={_id}>
                  <td>{index + 1}</td>
                  <td>{item?.subject?.Id_Subject}</td>
                  <td>{item?.subject?.name}</td>
                  <td>{item?.subject?.day_thi}</td>
                  <td>{item?.subject?.ca_thi}</td>
                  <td>{item?.subject?.room_thi}</td>
                  <button className="detail" onClick={() => handleDK(_id)}>
                    Đăng kí
                  </button>
                  <button
                    style={{
                      backgroundColor: " rgba(255, 0, 0, 0.6)",
                      marginLeft: "10px",
                    }}
                    className="detail"
                    onClick={() => handleHuyDK(_id)}
                  >
                    Hủy
                  </button>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
}
