import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";
import MyInfo from "../Components/MyInfo/MyInfo";
import Subjects from "../Components/KhaoThi/Subjects";
import Points from "../Components/KhaoThi/Points";

import { khaoThiLink } from "../utils/links";

const PhongKhaoThi = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.me?.data);

  useEffect(() => {
    if (!userLogin || userLogin?.user?.role !== "phongKhaoThi") {
      navigate("/");
    }
  }, [userLogin, navigate]);

  return (
    <>
      <Header />
      <Menu />
      <div className="body">
        <Navbar links={khaoThiLink} title="Góc phòng khảo thí" />
        <Routes>
          <Route exact path="myInfo" element={<MyInfo />} />
          <Route exact path="SubjectEd" element={<Subjects />} />
          <Route exact path="SubjectEd/:id" element={<Points />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default PhongKhaoThi;
