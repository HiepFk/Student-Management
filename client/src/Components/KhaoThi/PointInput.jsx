import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { UpdatePoint } from "../../redux/apiRequest";

function PointInput({ item, index }) {
  const dispatch = useDispatch();

  const { _id, student, diem_QT, diem_CK } = item;
  const [id, setId] = useState(_id);
  const [user, setUser] = useState(student);
  const [QT, setQT] = useState(diem_QT);
  const [CK, setCK] = useState(diem_CK);

  useEffect(() => {
    setId(item._id);
    setUser(item.student);
    setQT(item.diem_QT);
    setCK(item.diem_CK);
  }, [item]);
  const handeUpdate = (e) => {
    e.preventDefault();
    const data = {
      diem_QT: parseFloat(QT),
      diem_CK: parseFloat(CK),
    };
    UpdatePoint(dispatch, id, data);
  };
  return (
    <form className="info_form mini_wrapper" key={id} onSubmit={handeUpdate}>
      <div className="info_container mini_info">
        <div className="info_desc">{index + 1}</div>
      </div>
      <div className="info_container mini_info">
        <div className="info_desc">{user.Id_User}</div>
      </div>
      <div className="info_container mini_info">
        <div className="info_desc">{user.name}</div>
      </div>

      <div className="info_container mini_info">
        <input
          type="text"
          className="info_input mini_input"
          value={QT}
          onChange={(e) => setQT(e.target.value)}
        />
      </div>
      <div className="info_container mini_info">
        <input
          type="text"
          className="info_input mini_input "
          value={CK}
          onChange={(e) => setCK(e.target.value)}
        />
      </div>
      <button type="submit" value="" className="info_btn search_btn">
        update
      </button>
    </form>
  );
}

export default PointInput;
