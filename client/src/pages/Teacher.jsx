import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";
import MyInfo from "../Components/MyInfo/MyInfo";
import { teacherLinks } from "../utils/links";

import { Detail, MyClass, TKB } from "../Components/Teacher";
import Update from "../Components/Update/Update";

const Teacher = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.me?.data);

  useEffect(() => {
    if (!userLogin || userLogin?.user?.role !== "teacher") {
      navigate("/");
    }
  }, [userLogin, navigate]);
  return (
    <>
      <Header />
      <Menu />
      <div className="body">
        <Navbar links={teacherLinks} title="Góc giáo viên" />
        <Routes>
          <Route exact path="myInfo" element={<MyInfo />} />
          <Route exact path="MyClass" element={<MyClass />} />
          <Route exact path="MyClass/:id" element={<Detail />} />
          <Route exact path="TKB" element={<TKB />} />
          <Route exact path="TKB/:id" element={<Detail />} />
          <Route exact path="Student/:id" element={<Update />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Teacher;
