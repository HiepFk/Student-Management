import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { UpdateSubject } from "../../redux/apiRequest";

function InputLich({ item, index }) {
  const dispatch = useDispatch();

  const { _id, Id_Subject, name, day_thi, ca_thi, room_thi, timeThi } = item;

  const [Id, setId] = useState(_id);
  const [idSubject, setIdSubject] = useState(Id_Subject);
  const [Name, setName] = useState(name);

  const [day, setDay] = useState(day_thi);
  const [ca, setCa] = useState(ca_thi);
  const [room, setRoom] = useState(room_thi);
  const [time, setTime] = useState(timeThi);

  useEffect(() => {
    setId(item._id);
    setIdSubject(item.Id_Subject);
    setName(item.name);
    setDay(item.day_thi);
    setCa(item.ca_thi);
    setRoom(item.room_thi);
    setTime(item?.timeThi);
  }, [item]);

  const handeUpdate = (e) => {
    e.preventDefault();
    const data = {
      day_thi: day,
      ca_thi: ca,
      room_thi: room,
      timeThi: time,
    };
    UpdateSubject(dispatch, Id_Subject, data);
  };

  return (
    <form className="info_form mini_wrapper" key={Id} onSubmit={handeUpdate}>
      <div className="info_container mini_table">
        <div className="info_desc">{index + 1}</div>
      </div>
      <div className="info_container mini_table">
        <div className="info_desc">{idSubject}</div>
      </div>
      <div className="info_container mini_table">
        <div className="info_desc">{Name}</div>
      </div>
      <div className="info_container mini_table">
        <input
          type="text"
          className="info_input mini_input"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="info_container mini_table">
        <input
          type="text"
          className="info_input mini_input "
          value={ca}
          onChange={(e) => setCa(e.target.value)}
        />
      </div>
      <div className="info_container mini_table">
        <input
          type="text"
          className="info_input mini_input "
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
      </div>
      <div className="info_container mini_table">
        <input
          type="date"
          className="info_input mini_inputDate"
          value={(time && time.slice(0, 10)) || ""}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button type="submit" className="info_btn search_btn">
        update
      </button>
    </form>
  );
}

export default InputLich;
