import React from "react";
import { Link, useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="body_left">
      <div className="body_title">Danh sách sinh viên</div>
      <div className="body_wrapper">
        <table>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Name</th>
            <th>Photo</th>
          </tr>
          {data.map((item, index) => {
            const { _id, Id_User, name, photo } = item;
            return (
              <tr key={_id}>
                <td>{index + 1}</td>
                <td>{Id_User}</td>
                <td>{name}</td>
                <td>
                  <img src={photo} alt="Ảnh đại diện sv" className="user_img" />
                </td>

                <Link
                  className="detail btn_about"
                  to={`/TC/Student/${Id_User}`}
                >
                  About
                </Link>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Detail;
