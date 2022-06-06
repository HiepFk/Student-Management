import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../Components/Header";
import Menu from "../Components/Menu";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import MyInfo from "../Components/MyInfo/MyInfo";
import Users from "../Components/Admin/Users";
import AddUser from "../Components/Admin/AddUser";
import PieChart from "../Components/Admin/PieChart";
import Update from "../Components/Update/Update";

import { adminLink } from "../utils/links";

const Admin = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.auth.me?.data);

  useEffect(() => {
    if (!userLogin || userLogin?.user?.role !== "admin") {
      navigate("/");
    }
  }, [userLogin, navigate]);

  return (
    <>
      <Header />
      <Menu />
      <div className="body">
        <Navbar links={adminLink} title="Góc Admin" />
        <Routes>
          <Route exact path="myInfo" element={<MyInfo />} />
          <Route exact path="Users" element={<Users />} />
          <Route exact path="Users/:id" element={<Update />} />
          <Route exact path="AddUser" element={<AddUser />} />
          <Route exact path="ThongKe" element={<PieChart />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
