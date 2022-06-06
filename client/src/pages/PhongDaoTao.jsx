import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";
import MyInfo from "../Components/MyInfo/MyInfo";

import Update from "../Components/Update/Update";

import { daoTaoLink } from "../utils/links";

import {
  Subject,
  Subjects,
  ThongKe,
  LichThi,
  Classes,
  Class,
  Teachers,
} from "../Components/DaoTao";

const PhongDaoTao = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.me?.data);

  useEffect(() => {
    if (!userLogin || userLogin?.user?.role !== "phongDaoTao") {
      navigate("/");
    }
  }, [userLogin, navigate]);
  return (
    <>
      <Header />
      <Menu />
      <div className="body">
        <Navbar links={daoTaoLink} title="Góc nhân viên phòng đào tạo" />
        <Routes>
          <Route exact path="/myInfo" element={<MyInfo />} />
          <Route exact path="Subjects" element={<Subjects />} />
          <Route exact path="Subjects/:id" element={<Subject />} />
          <Route exact path="Classes" element={<Classes />} />
          <Route exact path="Classes/:id" element={<Class />} />
          <Route exact path="Teachers" element={<Teachers />} />
          <Route exact path="Teachers/:id" element={<Update />} />
          <Route exact path="Thi" element={<LichThi />} />
          <Route exact path="ThongKe" element={<ThongKe />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default PhongDaoTao;
