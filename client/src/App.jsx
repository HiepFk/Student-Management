import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  Admin,
  CongTacSV,
  PhongDaoTao,
  PhongKhaoThi,
  Student,
  Teacher,
  Error,
  Login,
} from "./pages";

import Alerts from "./Components/Alerts";

function App() {
  const Alert = useSelector((state) => state.alert);
  const Show = useSelector((state) => state.alert.show);
  const [alert, setAlert] = useState(Alert);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setAlert(Alert);
    setShow(Show);
  }, [Alert, Show]);

  return (
    <>
      {show && <Alerts type={`alert--${alert.type}`} msg={alert.msg} />}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/SV/*" element={<Student />} />
        <Route exact path="/TC/*" element={<Teacher />} />
        <Route exact path="/DT/*" element={<PhongDaoTao />} />
        <Route exact path="/KT/*" element={<PhongKhaoThi />} />
        <Route exact path="/CT/*" element={<CongTacSV />} />
        <Route exact path="/AD/*" element={<Admin />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
