import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";
import MyInfo from "../Components/MyInfo/MyInfo";
import AllStudent from "../Components/CongTacSV/AllStudent";
import Print from "../Components/CongTacSV/Print";
import Update from "../Components/Update/Update";

import { CongTacSVLink } from "../utils/links";

const CongTacSV = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.me?.data);

  useEffect(() => {
    if (!userLogin || userLogin?.user?.role !== "phongCtsv") {
      navigate("/");
    }
  }, [userLogin, navigate]);
  return (
    <>
      <Header />
      <Menu />
      <div className="body">
        <Navbar links={CongTacSVLink} title="Góc phòng công tác sinh viên" />
        <Routes>
          <Route exact path="myInfo" element={<MyInfo />} />
          <Route exact path="Students" element={<AllStudent />} />
          <Route exact path="Students/:id" element={<Update />} />
          <Route exact path="Transcript/:id" element={<Print />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default CongTacSV;
