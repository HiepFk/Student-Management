import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Menu from "../Components/Menu";
import Navbar from "../Components/Navbar";
import MyInfo from "../Components/MyInfo/MyInfo";
import { studentlLink } from "../utils/links";
import { useSelector, useDispatch } from "react-redux";

import { GetMe } from "../redux/apiRequest";

import {
  BangDiem,
  DKHoc,
  DKThiLai,
  LichThi,
  PhieuBaoDiem,
  PhieuBaoThuTien,
  TKB,
} from "../Components/Student";

const Student = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.auth.me?.data);

  useEffect(() => {
    if (!userLogin || userLogin?.user?.role !== "student") {
      navigate("/");
    }
  }, [userLogin, navigate]);

  useEffect(() => {
    GetMe(dispatch);
  }, [dispatch]);

  return (
    <>
      <Header />
      <Menu />
      <div className="body">
        <Navbar links={studentlLink} title="Góc sinh viên" />
        <Routes>
          <Route exact path="myInfo" element={<MyInfo />} />
          <Route exact path="DangKyHoc" element={<DKHoc />} />
          <Route exact path="DangKyThiLai" element={<DKThiLai />} />
          <Route exact path="ThoiKhoaBieu" element={<TKB />} />
          <Route exact path="BangDiem" element={<BangDiem />} />
          <Route exact path="LichThi" element={<LichThi />} />
          <Route exact path="PhieuBaoDiem" element={<PhieuBaoDiem />} />
          <Route exact path="PhieuBaoThuTien" element={<PhieuBaoThuTien />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Student;
